<script lang="ts">
  import { translate } from '$lib/translate';
  import { useTitle } from '$lib/ui/header';
  import HeaderBackButton from '$lib/ui/header/HeaderBackButton.svelte';
  import HeaderFormSubmitButton from '$lib/ui/header/HeaderFormSubmitButton.svelte';
  import { useLeftButton, useRightButton } from '$lib/ui/header/model';
  import TripForm from './TripForm.svelte';

  useLeftButton(HeaderBackButton);
  useTitle($translate('trips.add.title'));
  useRightButton(HeaderFormSubmitButton);
</script>

<div class="p-1">
  <TripForm />
</div>
