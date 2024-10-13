<script lang="ts">
  import { page } from '$app/stores';

  import { tripsStore, type Trip } from '$lib/data/trips';
  import { translate } from '$lib/translate';
  import Layout from '$lib/ui/Layout.svelte';
  import Portal from '$lib/ui/Portal.svelte';
  import { getSearchParam, setSearchParam } from '$lib/utils';
  import HeaderFormSubmitButton from '$lib/ui/header/HeaderFormSubmitButton.svelte';

  import EditTrip from './edit/EditTrip.svelte';
  import TripGroup from './TripGroup.svelte';
  import PointStay from './PointStay.svelte';

  $: trips = $tripsStore;

  $: tripId = getSearchParam($page, 'trip-id');
  const openTripForm = (id: string) => setSearchParam($page, 'trip-id', id, { replace: false });
  const closeTripForm = () => history.back();

  $: groups = (() => {
    if (trips.length === 0) return [];
    const groups: Array<{ items: Trip[]; until?: string }> = [{ items: [trips[0]] }];
    for (let i = 1; i < trips.length; i++) {
      if (!trips[i - 1].isTransfer) {
        groups.push({ items: [] });
      }
      groups[groups.length - 1].items.push(trips[i]);
      if (groups.length >= 2 && !groups[groups.length - 2].until) {
        groups[groups.length - 2].until = trips[i].departure.dateTime;
      }
    }
    return groups;
  })();
</script>

<ul class="groups flex-col gap-1">
  {#each groups as group, i (i)}
    {@const lastPoint = group.items[group.items.length - 1]}
    <li class="group flex-col gap-1">
      <TripGroup trips={group.items} onTripClick={openTripForm} />
      <PointStay point={lastPoint.to} from={lastPoint.arrival.dateTime} to={group.until} />
    </li>
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
