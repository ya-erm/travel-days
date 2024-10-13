<script lang="ts">
  import { page } from '$app/stores';
  import { type ComponentProps } from 'svelte';
  import { v4 as uuid } from 'uuid';

  import type { Trip, TripDBO, TripPoint, TripType } from '$lib/data/trips';
  import { translate } from '$lib/translate';
  import Button from '$lib/ui/Button.svelte';
  import Checkbox from '$lib/ui/Checkbox.svelte';
  import DateTimeInput from '$lib/ui/DateTimeInput.svelte';
  import Layout from '$lib/ui/Layout.svelte';
  import Portal from '$lib/ui/Portal.svelte';
  import TextArea from '$lib/ui/TextArea.svelte';
  import { showErrorToast } from '$lib/ui/toasts';
  import { deleteSearchParam, getSearchParam, setSearchParam } from '$lib/utils';

  import Input from '$lib/ui/Input.svelte';
  import InputLabel from '$lib/ui/InputLabel.svelte';
  import createBooleanStore from '$lib/utils/createBooleanStore';
  import FlightSearchModal from './FlightSearchModal.svelte';
  import TripPointForm from './TripPointForm.svelte';
  import TripPointInput from './TripPointInput.svelte';
  import TripTypeSwitch from './TripTypeSwitch.svelte';

  export let trip: Trip | null = null;
  export let onSubmit: (trip: TripDBO) => void;

  let tripType: TripType = trip?.type ?? 'airplane';

  let flightNumber: string | null = trip?.flightNumber ?? null;
  let airlineName: string | null = trip?.airlineName ?? null;

  let departurePoint: TripPoint | null = trip?.from ?? null;
  let arrivalPoint: TripPoint | null = trip?.to ?? null;

  let departureDateTime: string | null = trip?.departure.dateTime ?? null;
  let departureTimeZone: string | null = trip?.departure.timeZone ?? null;
  let arrivalDateTime: string | null = trip?.arrival.dateTime ?? null;
  let arrivalTimeZone: string | null = trip?.arrival.timeZone ?? null;

  let isTransfer: boolean = trip?.isTransfer ?? false;

  let additionalInfo: string | null = trip?.comment ?? null;

  const [flightSearchOpened, openFlightSearch] = createBooleanStore();

  $: pointSelectingParam = getSearchParam($page, 'pointSelecting');
  $: pointSelecting = pointSelectingParam === 'from' || pointSelectingParam === 'to';
  $: if (!!pointSelectingParam && !pointSelecting) {
    void deleteSearchParam($page, 'pointSelecting');
  }
  const openPointSelecting = async (type: 'from' | 'to') => {
    await setSearchParam($page, 'pointSelecting', type, { replace: false });
  };
  const closePointSelecting = async () => {
    history.back();
    await deleteSearchParam($page, 'pointSelecting');
  };

  const handlePointSubmit: ComponentProps<TripPointForm>['onSubmit'] = (point) => {
    if (pointSelectingParam === 'from') {
      departurePoint = point;
      departureTimeZone = point.city.timeZone;
    } else if (pointSelectingParam === 'to') {
      arrivalPoint = point;
      arrivalTimeZone = point.city.timeZone;
    }
    void closePointSelecting();
  };

  const handleSubmit = () => {
    if (!departurePoint) {
      showErrorToast($translate('trips.add.departure_point_required'));
      return;
    }
    if (!arrivalPoint) {
      showErrorToast($translate('trips.add.arrival_point_required'));
      return;
    }
    if (!departureDateTime || !departureTimeZone) {
      showErrorToast($translate('trips.add.departure_date_time_required'));
      return;
    }
    if (!arrivalDateTime || !arrivalTimeZone) {
      showErrorToast($translate('trips.add.arrival_date_time_required'));
      return;
    }
    onSubmit({
      id: trip?.id ?? uuid(),
      type: tripType,
      from: {
        countryId: departurePoint.country.id,
        cityId: departurePoint.city.id,
        airportId: departurePoint.airport?.id,
      },
      to: {
        countryId: arrivalPoint.country.id,
        cityId: arrivalPoint.city.id,
        airportId: arrivalPoint.airport?.id,
      },
      departure: {
        dateTime: departureDateTime,
        timeZone: departureTimeZone,
      },
      arrival: {
        dateTime: arrivalDateTime,
        timeZone: arrivalTimeZone,
      },
      comment: additionalInfo ?? undefined,
      flightNumber: flightNumber ?? undefined,
      airlineName: airlineName ?? undefined,
      isTransfer: isTransfer,
    });
  };
</script>

<form class="flex-col gap-1" on:submit|preventDefault={handleSubmit}>
  <TripTypeSwitch bind:value={tripType} />
  {#if tripType === 'airplane'}
    <div class="flex-col gap-0.5">
      <div class="flex gap-1 justify-between">
        <InputLabel text={$translate('trips.add.flight_number')} />
        <Button
          appearance="link"
          underlined={false}
          text={$translate('trips.add.flight_number.search')}
          on:click={openFlightSearch}
        />
      </div>
      <Input bind:value={flightNumber} endText={airlineName} />
    </div>
  {/if}
  <TripPointInput
    label={$translate('trips.add.from')}
    placeholder={$translate('trips.add.from_placeholder')}
    onClick={() => openPointSelecting('from')}
    value={departurePoint}
  />
  <TripPointInput
    label={$translate('trips.add.to')}
    placeholder={$translate('trips.add.to_placeholder')}
    onClick={() => openPointSelecting('to')}
    value={arrivalPoint}
  />
  <DateTimeInput
    label={$translate('trips.add.departure')}
    bind:value={departureDateTime}
    bind:zone={departureTimeZone}
  />
  <DateTimeInput label={$translate('trips.add.arrival')} bind:value={arrivalDateTime} bind:zone={arrivalTimeZone} />
  <Checkbox bind:checked={isTransfer} label={$translate('trips.add.transfer')} />
  <TextArea label={$translate('trips.add.additional_info')} bind:value={additionalInfo} />
  <Button type="submit">{$translate('common.save')}</Button>
  <slot name="footer" />
</form>

{#if pointSelecting}
  <Portal visible={pointSelecting}>
    <Layout
      header={{
        backButton: {
          onClick: closePointSelecting,
        },
        leftButton: null,
        rightButton: null,
        title: $translate(pointSelectingParam === 'from' ? 'trips.add.from' : 'trips.add.to'),
      }}
    >
      <div class="p-1">
        <TripPointForm
          point={pointSelectingParam === 'from' ? departurePoint : arrivalPoint}
          withoutAirport={tripType !== 'airplane'}
          onSubmit={handlePointSubmit}
        />
      </div>
    </Layout>
  </Portal>
{/if}

<FlightSearchModal
  bind:opened={$flightSearchOpened}
  {flightNumber}
  onSuccess={(value) => {
    airlineName = value.airlineName ?? null;
    flightNumber = value.flightNumber;
    departurePoint = value.departurePoint;
    departureDateTime = value.departureDateTime;
    departureTimeZone = value.departureTimeZone;
    arrivalPoint = value.arrivalPoint;
    arrivalDateTime = value.arrivalDateTime;
    arrivalTimeZone = value.arrivalTimeZone;
  }}
/>
