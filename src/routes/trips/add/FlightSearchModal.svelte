<script lang="ts">
  import { airports } from '$lib/data/airports';
  import type { TripPoint } from '$lib/data/trips';
  import type { GetFlightsByNumberRequest, GetJournalResponse } from '$lib/server/api/flights/getFlightsByNumber';
  import { translate } from '$lib/translate';
  import Button from '$lib/ui/Button.svelte';
  import Input from '$lib/ui/Input.svelte';
  import Modal from '$lib/ui/Modal.svelte';
  import { showErrorToast } from '$lib/ui/toasts/toasts';
  import { useFetch } from '$lib/utils';
  import { mapFlightTime } from './mapFlightTime';

  export let opened: boolean;

  export let flightNumber: string | null = '';

  export let onSuccess: (value: {
    flightNumber: string;
    departureDateTime: string;
    departureTimeZone: string;
    departurePoint: TripPoint | null;
    arrivalDateTime: string;
    arrivalTimeZone: string;
    arrivalPoint: TripPoint | null;
    airlineName?: string | null;
  }) => void;

  let flightDate: string = '';

  const searchFlightsByNumberFetcher = useFetch<GetFlightsByNumberRequest, GetJournalResponse>(
    'POST',
    '/api/flights/by-number',
  );

  const searchByFlightNumber = async () => {
    if (!flightNumber) return;
    try {
      const data = await searchFlightsByNumberFetcher.fetch({
        flightNumber: flightNumber.toUpperCase().replaceAll(/[^0-9A-Z]/g, ''),
      });
      if (data.items.length === 0) {
        showErrorToast($translate('trips.app.failed_to_find_flight'));
        return;
      }
      const flight = data.items[0];

      let departurePoint: TripPoint | null = null;
      const departureAirport = $airports.find(({ code }) => code === flight.departure.airport);
      if (departureAirport && departureAirport.city && departureAirport.country) {
        departurePoint = {
          airport: departureAirport,
          city: departureAirport.city,
          country: departureAirport.country,
        };
      } else {
        console.error('Failed to find departure airport', flight.departure.airport);
      }

      let arrivalPoint: TripPoint | null = null;
      const arrivalAirport = $airports.find(({ code }) => code === flight.arrival.airport);
      if (arrivalAirport && arrivalAirport.city && arrivalAirport.country) {
        arrivalPoint = {
          airport: arrivalAirport,
          city: arrivalAirport.city,
          country: arrivalAirport.country,
        };
      } else {
        console.error('Failed to find arrival airport', flight.arrival.airport);
      }

      const { departureDateTime, arrivalDateTime } = mapFlightTime({
        flightDate,
        departureTime: flight.departure.time,
        departureTimezone: flight.departure.timezone,
        arrivalTime: flight.arrival.time,
        arrivalTimezone: flight.arrival.timezone,
      });

      onSuccess({
        flightNumber: flight.flightNumber,
        departurePoint,
        departureDateTime,
        departureTimeZone: flight.departure.timezone,
        arrivalPoint,
        arrivalDateTime,
        arrivalTimeZone: flight.arrival.timezone,
        airlineName: flight.airline.name,
      });

      opened = false;
    } catch (e) {
      console.error(e);
      showErrorToast($translate('trips.app.failed_to_find_flight'));
    }
  };
</script>

<Modal width={18} bind:opened header={$translate('trips.add.search_by_flight_number')}>
  <form class="flex-col gap-1" on:submit|preventDefault={searchByFlightNumber}>
    <Input required label={$translate('trips.add.flight_number')} bind:value={flightNumber} />
    <Input label={$translate('trips.add.flight_date')} bind:value={flightDate} type="date" />
    <div class="grid-col-2 gap-1">
      <Button text={$translate('common.cancel')} color="secondary" on:click={() => (opened = false)} />
      <Button text={$translate('common.search')} type="submit" />
    </div>
  </form>
</Modal>
