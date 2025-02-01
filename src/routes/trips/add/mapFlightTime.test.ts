import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

import { mapFlightTime } from './mapFlightTime';

describe('[mapFlightTime]', () => {
  describe('[no custom flight date]', () => {
    test('same arrival date', () => {
      expect(
        mapFlightTime({
          flightDate: '',
          departureTime: '2024-10-13T15:10:00+00:00',
          departureTimezone: 'Europe/Istanbul',
          arrivalTime: '2024-10-13T15:55:00+00:00',
          arrivalTimezone: 'Europe/Belgrade',
        }),
      ).toMatchObject({
        departureDateTime: '2024-10-13T15:10:00+03:00',
        arrivalDateTime: '2024-10-13T15:55:00+02:00',
      });
    });

    test('next day arrival date', () => {
      expect(
        mapFlightTime({
          flightDate: '',
          departureTime: '2024-10-13T21:50:00+00:00',
          departureTimezone: 'Europe/Moscow',
          arrivalTime: '2024-10-14T04:20:00+00:00',
          arrivalTimezone: 'Asia/Almaty',
        }),
      ).toMatchObject({
        departureDateTime: '2024-10-13T21:50:00+03:00',
        arrivalDateTime: '2024-10-14T04:20:00+05:00',
      });
    });

    test('previous day arrival date', () => {
      expect(
        mapFlightTime({
          flightDate: '',
          departureTime: '2024-10-13T00:20:00+00:00',
          departureTimezone: 'Asia/Almaty',
          arrivalTime: '2024-10-12T23:50:00+00:00',
          arrivalTimezone: 'Europe/Moscow',
        }),
      ).toMatchObject({
        departureDateTime: '2024-10-13T00:20:00+05:00',
        arrivalDateTime: '2024-10-12T23:50:00+03:00',
      });
    });
  });

  describe('[custom flight date]', () => {
    test('same arrival date', () => {
      expect(
        mapFlightTime({
          flightDate: '2024-05-25',
          departureTime: '2024-10-13T15:10:00+00:00',
          departureTimezone: 'Europe/Istanbul',
          arrivalTime: '2024-10-13T15:55:00+00:00',
          arrivalTimezone: 'Europe/Belgrade',
        }),
      ).toMatchObject({
        departureDateTime: '2024-05-25T15:10:00+03:00',
        arrivalDateTime: '2024-05-25T15:55:00+02:00',
      });
    });

    test('next day arrival date', () => {
      expect(
        mapFlightTime({
          flightDate: '2024-05-25',
          departureTime: '2024-10-13T21:50:00+00:00',
          departureTimezone: 'Europe/Moscow',
          arrivalTime: '2024-10-14T04:20:00+00:00',
          arrivalTimezone: 'Asia/Almaty',
        }),
      ).toMatchObject({
        departureDateTime: '2024-05-25T21:50:00+03:00',
        arrivalDateTime: '2024-05-26T04:20:00+05:00',
      });
    });

    test('previous day arrival date', () => {
      expect(
        mapFlightTime({
          flightDate: '2024-05-25',
          departureTime: '2024-10-13T00:20:00+00:00',
          departureTimezone: 'Asia/Almaty',
          arrivalTime: '2024-10-12T23:50:00+00:00',
          arrivalTimezone: 'Europe/Moscow',
        }),
      ).toMatchObject({
        departureDateTime: '2024-05-25T00:20:00+05:00',
        arrivalDateTime: '2024-05-24T23:50:00+03:00',
      });
    });
  });
});
