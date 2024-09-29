<script lang="ts">
  import { page } from '$app/stores';

  import { tripsStore } from '$lib/data/trips';
  import { translate } from '$lib/translate';
  import Layout from '$lib/ui/Layout.svelte';
  import Portal from '$lib/ui/Portal.svelte';
  import { getSearchParam, setSearchParam } from '$lib/utils';
  import HeaderFormSubmitButton from '$lib/ui/header/HeaderFormSubmitButton.svelte';

  import TripListItem from './TripListItem.svelte';
  import EditTrip from './edit/EditTrip.svelte';

  $: trips = $tripsStore;

  $: tripId = getSearchParam($page, 'trip-id');
  const openTripForm = (id: string) => setSearchParam($page, 'trip-id', id, { replace: false });
  const closeTripForm = () => history.back();
</script>

<ul class="flex-col gap-1">
  {#each trips as trip (trip.id)}
    <TripListItem {trip} onClick={() => openTripForm(trip.id)} />
  {/each}
</ul>

<Portal visible={tripId !== null}>
  <Layout
    header={{
      backButton: {
        onClick: closeTripForm,
      },
      leftButton: null,
      rightButton: HeaderFormSubmitButton,
      title: $translate('trips.edit.title'),
    }}
  >
    <div class="p-1">
      <EditTrip {tripId} onBack={closeTripForm} />
    </div>
  </Layout>
</Portal>

<style>
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
</style>
