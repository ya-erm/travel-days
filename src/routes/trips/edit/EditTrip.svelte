<script lang="ts">
  import { tripsService, tripsStore, type TripDBO } from '$lib/data/trips';
  import { translate } from '$lib/translate';
  import Button from '$lib/ui/Button.svelte';

  import TripForm from '../add/TripForm.svelte';

  export let tripId: string | null;
  export let onBack: () => void;

  const trip = $tripsStore.find((trip) => trip.id === tripId);

  const handleSubmit = async (trip: TripDBO) => {
    tripsService.save(trip);
    onBack();
  };

  const handleDelete = () => {
    if (!tripId) return;
    const trip = tripsService.getById(tripId);
    if (trip) {
      tripsService.delete(trip);
      onBack();
    }
  };
</script>

<TripForm {trip} onSubmit={handleSubmit}>
  <Button
    slot="footer"
    on:click={handleDelete}
    text={$translate('trips.edit.delete_trip')}
    testId="DeleteTripButton"
    appearance="transparent"
    color="danger"
  />
</TripForm>
