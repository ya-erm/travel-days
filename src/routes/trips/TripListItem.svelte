<script lang="ts">
  import dayjs from 'dayjs';

  import type { Trip } from '$lib/data/trips';
  import { translate } from '$lib/translate';
  import ButtonBase from '$lib/ui/ButtonBase.svelte';
  import Icon from '$lib/ui/Icon.svelte';
  import Spoiler from '$lib/ui/Spoiler.svelte';
  import SpoilerToggle from '$lib/ui/SpoilerToggle.svelte';
  import { formatDuration } from '$lib/utils/formatDate';

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
  const from = trip.from.airport?.code ?? trip.from.city.name;
  const to = trip.to.airport?.code ?? trip.to.city.name;
  const title = `${from} - ${to}`;

  const totalMinutes = dayjs(trip.arrival.dateTime).diff(dayjs(trip.departure.dateTime), 'minutes');
  const duration = formatDuration(totalMinutes, $translate);

  let hidden = true;
</script>

<li class="flex-col">
  <SpoilerToggle bind:hidden withoutText>
    <div class="flex gap-0.5 items-center">
      <div class="flex gap-0.25 items-center">
        <Icon name={icon} />
        <span>{trip.flightNumber ? `${trip.flightNumber} (${title})` : `${title}`}</span>
      </div>
      <span class="secondary">{duration}</span>
    </div>
  </SpoilerToggle>
  <Spoiler {hidden}>
    <ButtonBase on:click={onClick}>
      <div class="w-full flex-col">
        <div class="container w-full gap-0.25 items-start">
          <div class="relative h-full">
            <div class:line={trip.isTransfer}></div>
          </div>
          <TripPoint point={trip.from} timestamp={trip.departure} />
          <Icon name="material-symbols-light:chevron-right-rounded" />
          <TripPoint point={trip.to} timestamp={trip.arrival} />
        </div>
      </div>
    </ButtonBase>
  </Spoiler>
</li>

<style>
  .container {
    display: grid;
    grid-template-columns: 1.5rem 1fr auto 1fr;
  }
  .line {
    position: absolute;
    height: calc(100% + 1rem);
    width: 0px;
    border-left: 2px dashed gray;
    left: 0.75rem;
  }
  .secondary {
    color: var(--secondary-text-color);
  }
</style>
