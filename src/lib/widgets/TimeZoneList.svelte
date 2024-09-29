<script lang="ts">
  import dayjs from 'dayjs';
  import { getTimeZones } from '@vvo/tzdb';

  import { translate } from '$lib/translate';
  import Input from '$lib/ui/Input.svelte';
  import ListGroup from '$lib/ui/list-group/ListGroup.svelte';
  import { showSuccessToast } from '$lib/ui/toasts';

  import TimeZoneListItem from './TimeZoneListItem.svelte';

  export let onClick: (timezone: string, shift: string) => void;
  export let showCurrentTimeZone = true;

  let search: string = '';

  const timezones = getTimeZones();

  $: filteredTimeZones = (() => {
    if (!search) return timezones;
    const s = search.toLocaleLowerCase();
    const items: Array<{ tz: (typeof timezones)[0]; priority: number }> = [];
    for (const tz of timezones) {
      // by timezone name (case sensitive)
      if (tz.name.includes(search)) {
        items.push({ tz, priority: 1 });
        continue;
      }
      // by timezone name (case insensitive)
      if (tz.name.toLowerCase().includes(s)) {
        items.push({ tz, priority: 2 });
        continue;
      }
      // by timezone offset
      if (tz.currentTimeFormat.substring(0, 6).includes(search.replace(/([+-])(\d){1}/, '$10$2'))) {
        items.push({ tz, priority: 3 });
        continue;
      }
      // by timezone abbreviation (case sensitive)
      if (tz.abbreviation === search) {
        items.push({ tz, priority: 3 });
        continue;
      }
      // by city name
      if (tz.mainCities.join(', ').toLowerCase().includes(s)) {
        items.push({ tz, priority: 4 });
        continue;
      }
      // by group name
      if (tz.group.join(', ').toLowerCase().includes(s)) {
        items.push({ tz, priority: 5 });
        continue;
      }
    }
    items.sort((a, b) => a.priority - b.priority);
    return items.map((x) => x.tz);
  })();

  const currentTimeZoneCode = dayjs.tz.guess();
  const currentTimeZone = timezones.find((timezone) => timezone.name === currentTimeZoneCode);

  // TODO
  $: favoriteTimeZones = timezones.filter(() => false);

  const addToFavorite = async (timezone: string) => {
    // TODO
    // await updateSettings({
    //  favoriteTimeZones: [...(settings?.favoriteTimeZones ?? []), timezone],
    //});
    showSuccessToast($translate('timezones.timezone_added_to_favorites'));
  };

  const removeFromFavorite = async (timezone: string) => {
    // TODO:
    // await updateSettings({
    //   favoriteTimeZones: settings?.favoriteTimeZones?.filter((x) => x !== timezone) ?? [],
    // });
    showSuccessToast($translate('timezones.timezone_removed_from_favorites'));
  };
</script>

<div class="flex-col gap-1">
  <div class="flex-grow">
    <Input bind:value={search} placeholder={$translate('common.search')} clearable />
  </div>

  {#if showCurrentTimeZone && currentTimeZone}
    <ListGroup title={$translate('timezones.current_time_zone')}>
      <TimeZoneListItem timezone={currentTimeZone} {onClick} />
    </ListGroup>
  {/if}

  {#if favoriteTimeZones.length > 0}
    <ListGroup title={$translate('timezones.favorite_time_zones')}>
      {#each favoriteTimeZones as timezone (timezone.name)}
        <TimeZoneListItem {timezone} {onClick} onLongClick={removeFromFavorite} />
      {/each}
    </ListGroup>
  {/if}

  <ListGroup title={$translate('timezones.all_time_zones')}>
    {#each filteredTimeZones as timezone (timezone.name)}
      <TimeZoneListItem {timezone} {onClick} onLongClick={addToFavorite} />
    {/each}
  </ListGroup>
</div>
