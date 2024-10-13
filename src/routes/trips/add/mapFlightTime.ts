import dayjs from 'dayjs';

type MapFlightTimeArgs = {
  /** Custom date of flight, example 2024-10-25 */
  flightDate: string | null;
  /** Departure time, example "2024-10-13T15:10:00+00:00" */
  departureTime: string;
  /** Departure time zone, example "Europe/Moscow" */
  departureTimezone: string;
  /** Arrival time */
  arrivalTime: string;
  /** Arrival time zone */
  arrivalTimezone: string;
};

/**
 * Map flight time to custom flight date
 * @returns departure and arrival dates with time shift, example "2024-10-13T15:10:00+03:00"
 */
export function mapFlightTime(args: MapFlightTimeArgs) {
  const date = args.flightDate ? new Date(args.flightDate) : null;

  let departureTime = dayjs.tz(args.departureTime, args.departureTimezone);

  if (date) {
    departureTime = departureTime
      // set year, month and day
      .set('year', date.getFullYear())
      .set('month', date.getMonth())
      .set('date', date.getDate());
  }
  const departureDateTime = departureTime.format();

  let arrivalTime = dayjs.tz(args.arrivalTime, args.arrivalTimezone);

  if (date) {
    arrivalTime = arrivalTime
      // set year, month and day
      .set('year', date.getFullYear())
      .set('month', date.getMonth())
      .set('date', date.getDate());

    // Date in YYYY-MM-DD format, example "2024-10-25"
    const departureDate = args.departureTime.split('T')[0];
    const arrivalDate = args.arrivalTime.split('T')[0];

    // If arrival date is different from departure date
    const diff = dayjs(arrivalDate).diff(dayjs(departureDate), 'day');
    if (diff !== 0) {
      arrivalTime = arrivalTime.add(diff, 'day');
    }
  }
  const arrivalDateTime = arrivalTime.format();

  return {
    departureDateTime,
    arrivalDateTime,
  };
}
