<script lang="ts">
  import type { TimeZone } from '@vvo/tzdb';

  import ListGroupItem from '$lib/ui/list-group/ListGroupItem.svelte';
  import { longPress } from '$lib/utils';
  import { minutesToOffset } from '$lib/utils/getTimeZoneOffset';

  export let timezone: TimeZone;

  export let onClick: (timezone: string, shift: string) => void;
  export let onLongClick: ((timezone: string) => void) | null = null;
</script>

<ListGroupItem>
  <button
    class="item flex gap-1 items-center"
    on:click={() => onClick(timezone.name, minutesToOffset(timezone.currentTimeOffsetInMinutes))}
    use:longPress={() => onLongClick?.(timezone.name)}
  >
    <div class="flex-col gap-0.25 items-start flex-grow">
      <span class="name text-ellipsis-all">{timezone.name}</span>
      <span class="description text-ellipsis-all">{timezone.mainCities.join(', ')}</span>
    </div>
    <span class="utc">
      UTC{minutesToOffset(timezone.currentTimeOffsetInMinutes)}
    </span>
  </button>
</ListGroupItem>

<style>
  button {
    width: 100%;
    border: none;
    outline: none;
    font-size: 1rem;
    background: transparent;
    align-self: stretch;
    cursor: pointer;
    padding: 0.5rem 1rem;
    color: var(--primary-text-color);
  }
  @media (hover: hover) {
    button:hover {
      background: var(--hover-background-color);
    }
  }
  .name {
    font-weight: 500;
  }
  .description {
    font-size: 0.9rem;
    color: var(--secondary-text-color);
  }
  .utc {
    text-wrap: nowrap;
  }
</style>
