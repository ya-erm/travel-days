<script lang="ts">
  import dayjs from 'dayjs';

  import { translate } from '$lib/translate';
  import Button from '$lib/ui/Button.svelte';
  import Input from '$lib/ui/Input.svelte';
  import InputLabel from '$lib/ui/InputLabel.svelte';
  import Layout from '$lib/ui/Layout.svelte';
  import Portal from '$lib/ui/Portal.svelte';
  import { getTimeZoneOffset } from '$lib/utils/getTimeZoneOffset';
  import TimeZoneList from '$lib/widgets/TimeZoneList.svelte';

  export let label: string | null = null;
  export let value: string | null = null;
  export let zone: string | null = null;

  $: timeZone = zone ?? dayjs.tz.guess();

  let timeZoneListVisible = false;

  const today = dayjs().format('YYYY-MM-DD');

  const getDateTime = (date: string | null, time: string | null) => {
    if (!date && !time) return null;
    return dayjs.tz(`${date ?? today} ${time ?? ''}`, timeZone).format();
  };

  $: date = value ? dayjs(value).tz(timeZone).format('YYYY-MM-DD') : null;
  $: time = value ? dayjs(value).tz(timeZone).format('HH:mm') : null;
  $: datetime = getDateTime(date, time);
  $: timeZoneShift = timeZone ? getTimeZoneOffset(timeZone) : null;

  const handleDateChanged = (v: string) => {
    datetime = getDateTime(v, time);
    value = datetime;
  };
  const handleTimeChanged = (v: string) => {
    datetime = getDateTime(date, v);
    value = datetime;
  };
</script>

<div class="flex-col gap-0.5">
  <div class="flex gap-1 justify-between">
    <span class="flex-shrink-0">
      <InputLabel text={label ?? $translate('common.date_and_time')} />
    </span>
    <Button appearance="link" underlined={false} on:click={() => (timeZoneListVisible = true)}>
      {#if timeZone}
        <div class="w-full flex gap-0.25">
          <span class="time-zone text-ellipsis-block">{timeZone}</span>
          <span class="time-shift">(GMT{timeZoneShift})</span>
        </div>
      {:else}
        {$translate('timezones.select_time_zone')}
      {/if}
    </Button>
  </div>
  <div class="flex gap-1">
    <Input name="date" type="date" bind:value={date} required onChange={handleDateChanged} />
    <Input name="time" type="time" bind:value={time} required onChange={handleTimeChanged} />
  </div>
</div>

<Portal visible={timeZoneListVisible}>
  <Layout
    header={{
      title: $translate('timezones.select_time_zone'),
      backButton: { title: '', onClick: () => (timeZoneListVisible = false) },
      leftButton: null,
      rightButton: null,
    }}
  >
    <div class="p-1">
      <TimeZoneList
        onClick={(tz, shift) => {
          timeZone = tz;
          timeZoneShift = shift;
          datetime = getDateTime(date, time);
          timeZoneListVisible = false;
          value = datetime;
          zone = tz;
        }}
      />
    </div>
  </Layout>
</Portal>
