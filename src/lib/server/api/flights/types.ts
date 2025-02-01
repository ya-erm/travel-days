export type AviationStackFlightsResponse = {
  pagination: {
    limit: number;
    offset: number;
    count: number;
    total: number;
  };
  data: Array<{
    /** example '2019-12-12' */
    flight_date: string;
    /** example 'scheduled' */
    flight_status: 'scheduled' | 'active' | 'landed' | 'cancelled' | 'incident' | 'diverted';
    departure: {
      /** example 'San Francisco International' */
      airport: string;
      /** example 'America/Los_Angeles' */
      timezone: string;
      /** example 'SFO' */
      iata: string;
      /** example 'KSFO' */
      icao: string;
      /** example '2' */
      terminal: string | null;
      /** example 'A06' */
      gate: string | null;
      /** example 15 */
      delay: number | null;
      /** example '2019-12-12T04:20:00+00:00' */
      scheduled: string;
      /** example '2019-12-12T04:20:00+00:00' */
      estimated: string;
      /** example '2019-12-12T04:35:00+00:00' */
      actual: string | null;
      /** example '2019-12-12T04:35:00+00:00' */
      estimated_runway: string | null;
      /** example '2019-12-12T04:37:00+00:00' */
      actual_runway: string | null;
    };
    arrival: {
      /** example 'San Francisco International' */
      airport: string;
      /** example 'America/Los_Angeles' */
      timezone: string;
      /** example 'SFO' */
      iata: string;
      /** example 'KSFO' */
      icao: string;
      /** example '2' */
      terminal: string | null;
      /** example 'A06' */
      gate: string | null;
      /** example 'A17' */
      baggage: string | null;
      /** example 15 */
      delay: number | null;
      /** example '2019-12-12T04:20:00+00:00' */
      scheduled: string;
      /** example '2019-12-12T04:20:00+00:00' */
      estimated: string;
      /** example '2019-12-12T04:35:00+00:00' */
      actual: string | null;
      /** example '2019-12-12T04:35:00+00:00' */
      estimated_runway: string | null;
      /** example '2019-12-12T04:37:00+00:00' */
      actual_runway: string | null;
    };
    airline: {
      /** example 'American Airlines' */
      name: string;
      /** example 'AA' */
      iata: string;
      /** example 'AAL' */
      icao: string;
    };
    flight: {
      /** example '373' */
      number: string;
      /** example 'AA373' */
      iata: string;
      /** example 'AAL373' */
      icao: string;
    };
  }>;
};
