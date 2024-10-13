<script lang="ts">
  import dayjs from 'dayjs';

  import type { DateTime, TripPoint } from '$lib/data/trips';
  import Icon from '$lib/ui/Icon.svelte';
  import { getTimeZoneOffset } from '$lib/utils';
  import { formatDate } from '$lib/utils/formatDate';

  export let point: TripPoint;
  export let timestamp: DateTime;

  const icon = point.country?.code ? `flag:${point.country.code.toLocaleLowerCase()}-1x1` : null;

  const tooltip = (() => {
    const countryName = point?.country?.name;
    const cityName = point?.airport?.name !== point?.city.name ? point?.city?.name : null;
    const place = cityName && countryName ? `${cityName}, ${countryName}` : (countryName ?? cityName);
    const airport = point?.airport ? `${point?.airport.code} - ${point?.airport.name}` : null;
    return airport && place ? `${airport}, ${place}` : airport;
  })();

  const text = (() => {
    // const countryName = point?.country?.name;
    // const cityName = point?.airport?.name !== point?.city.name ? point?.city?.name : null;
    // const place = cityName && countryName ? `${cityName}, ${countryName}` : (countryName ?? cityName);
    // const airport = point?.airport ? `${point?.airport.code} - ${point?.airport.name}` : null;
    // return airport && place ? `${airport}, ${place}` : airport;
    return `${point.city.name}, ${point.country.name}`;
  })();

  const timeZone = timestamp.timeZone;

  $: date = dayjs(timestamp.dateTime).tz(timeZone);
  $: timeZoneShift = timeZone ? getTimeZoneOffset(timeZone) : null;
</script>

<div class="block flex-col gap-0.25">
  <div class="flex items-center gap-0.25" title={tooltip}>
    <div class="icon flex-center flex-shrink-0">
      {#if icon}
        <Icon name={icon} />
      {:else}
        <Icon
          name="material-symbols-light:question-mark-rounded"
          color={'var(--secondary-text-color)'}
          size={1.25}
          padding={0.125}
        />
      {/if}
    </div>
    <span class="text-ellipsis-block no-wrap">{text}</span>
  </div>
  <div class="flex gap-0.25">
    <span>{date.format('HH:mm')}</span>
    <span class="time-shift secondary">(UTC{timeZoneShift})</span>
  </div>
  <div class="flex">
    <span class="date secondary">{formatDate(date)}</span>
  </div>
</div>

<style>
  .block {
    overflow: hidden;
  }
  .icon {
    overflow: hidden;
    border-radius: 50%;
    border: 1px solid var(--border-color);
  }
  .time-shift {
    font-size: 0.9rem;
  }
  .date {
    font-size: 0.9rem;
  }
  .secondary {
    color: var(--secondary-text-color);
  }
</style>
