<script lang="ts">
  import { goto } from '$app/navigation';

  import { tripsService, type TripDBO } from '$lib/data/trips';
  import { routes } from '$lib/routes';
  import { translate } from '$lib/translate';
  import { useTitle } from '$lib/ui/header';
  import HeaderBackButton from '$lib/ui/header/HeaderBackButton.svelte';
  import HeaderFormSubmitButton from '$lib/ui/header/HeaderFormSubmitButton.svelte';
  import { useLeftButton, useRightButton } from '$lib/ui/header/model';

  import TripForm from './TripForm.svelte';

  useLeftButton(HeaderBackButton);
  useTitle($translate('trips.add.title'));
  useRightButton(HeaderFormSubmitButton);

  const handleSubmit = async (trip: TripDBO) => {
    tripsService.save(trip);
    await goto(routes.trips.path, { replaceState: false });
  };
</script>

<div class="p-1">
  <TripForm onSubmit={handleSubmit} />
</div>
