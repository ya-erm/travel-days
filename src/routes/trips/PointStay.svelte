<script lang="ts">
  import dayjs from 'dayjs';

  import type { TripPoint } from '$lib/data/trips';
  import { translate } from '$lib/translate';
  import Icon from '$lib/ui/Icon.svelte';
  import { formatDate } from '$lib/utils/formatDate';

  export let point: TripPoint;
  export let from: string | null;
  export let to: string | null | undefined;

  const icon = point.country?.code ? `flag:${point.country.code.toLocaleLowerCase()}-1x1` : null;

  const dates = (() => {
    const fromDate = from ? formatDate(dayjs(from)) : null;
    const toDate = to ? formatDate(dayjs(to)) : null;
    if (from && to) {
      return `${fromDate} - ${toDate}`;
    }
    if (from && !to) {
      return `${fromDate} - ${$translate('common.date.currentTime')}`;
    }
    if (!from && to) {
      return $translate('common.date.until', { values: { date: toDate } });
    }
    return null;
  })();

  const days = from ? Math.ceil(dayjs(to ?? undefined).diff(dayjs(from), 'days', true)) : null;
</script>

<div class="container flex gap-0.5 p-0.5 items-center">
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
  <div class="line" />
  <div class="flex-grow flex-col">
    <div class="title">{`${point.city.name}, ${point.country.name}`}</div>
    {#if dates}
      <div class="date secondary">{dates}</div>
    {/if}
  </div>
  <div class="line" />
  {#if days}
    <div class="flex-col items-center">
      <div>{days}</div>
      <div class="days">{$translate('trips.list.item.days', { values: { count: days } })}</div>
    </div>
  {/if}
</div>

<style>
  .container {
    background: var(--header-background-color);
    border-radius: 1rem;
  }
  .icon {
    overflow: hidden;
    border-radius: 50%;
    border: 1px solid var(--border-color);
  }
  .line {
    width: 1px;
    align-self: stretch;
    background: var(--border-color);
  }
  .secondary {
    color: var(--secondary-text-color);
  }
  .date {
    font-size: 0.875rem;
  }
  .days {
    font-size: 0.75rem;
    text-align: center;
    min-width: 28px;
  }
</style>
