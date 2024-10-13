<script lang="ts">
  import type { Trip } from '$lib/data/trips';
  import TripListItem from './TripListItem.svelte';

  export let trips: Trip[];
  export let onTripClick: (id: string) => void;
</script>

<ul class="flex-col gap-1">
  {#each trips as trip (trip.id)}
    <TripListItem {trip} onClick={() => onTripClick(trip.id)} />
  {/each}
</ul>

<style>
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
</style>
