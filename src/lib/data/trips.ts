import { derived } from 'svelte/store';
import { airports, type Airport } from './airports';
import { cities, type City } from './cities';
import { countries, type Country } from './countries';
import { BaseService } from './service';

export type TripType = 'airplane' | 'car' | 'ship';

export type DateTime = {
  dateTime: string;
  timeZone: string;
};

export type TripPointDBO = {
  countryId: string;
  cityId: string;
  airportId?: string;
};

export type TripDBO = {
  id: string;
  type: TripType;
  from: TripPointDBO;
  to: TripPointDBO;
  departure: DateTime;
  arrival: DateTime;
  comment?: string;
  flightNumber?: string;
  airlineName?: string;
  deleted?: boolean;
};

// View models

export type TripPoint = {
  country: Country;
  city: City;
  airport?: Airport;
};

export type Trip = {
  id: string;
  type: TripType;
  from: TripPoint;
  to: TripPoint;
  departure: DateTime;
  arrival: DateTime;
  comment?: string;
  flightNumber?: string;
  airlineName?: string;
  deleted?: boolean;
};

// Service

class TripsService extends BaseService<TripDBO> {
  private _store;

  constructor() {
    super('TripService', 'trips', 'trip');

    this._store = derived([this.$items, countries, cities, airports], ([items, countries, cities, airports]) =>
      items
        .map(
          (item): Trip => ({
            ...item,
            from: {
              country: countries.find((country) => country.id === item.from.countryId)!,
              city: cities.find((city) => city.id === item.from.cityId)!,
              airport: item.from.airportId ? airports.find((airport) => airport.id === item.from.airportId) : undefined,
            },
            to: {
              country: countries.find((country) => country.id === item.to.countryId)!,
              city: cities.find((city) => city.id === item.to.cityId)!,
              airport: item.to.airportId ? airports.find((airport) => airport.id === item.to.airportId) : undefined,
            },
          }),
        )
        .sort((a, b) => (a.departure.dateTime < b.departure.dateTime ? -1 : 1)),
    );
  }

  get $trips() {
    return this._store;
  }
}

export const tripsService = new TripsService();
export const tripsStore = tripsService.$trips;
