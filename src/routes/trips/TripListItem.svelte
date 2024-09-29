<script lang="ts">
  import type { Trip } from '$lib/data/trips';
  import ButtonBase from '$lib/ui/ButtonBase.svelte';
  import Icon from '$lib/ui/Icon.svelte';

  import TripPoint from './TripPoint.svelte';

  export let trip: Trip;
  export let onClick: () => void;

  const icon = (() => {
    switch (trip.type) {
      case 'airplane':
        return 'material-symbols-light:travel';
      case 'car':
        return 'mdi:car-side';
      case 'ship':
        return 'material-symbols-light:directions-boat-rounded';
    }
  })();
</script>

<li class="flex-col">
  <ButtonBase on:click={onClick}>
    <div class="container w-full gap-0.25 items-start">
      <Icon name={icon} />
      <TripPoint point={trip.from} timestamp={trip.departure} />
      <Icon name="material-symbols-light:chevron-right-rounded" />
      <TripPoint point={trip.to} timestamp={trip.arrival} />
    </div>
  </ButtonBase>
</li>

<style>
  .container {
    display: grid;
    grid-template-columns: auto 1fr auto 1fr;
  }
</style>
