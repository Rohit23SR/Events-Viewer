export interface EventDate {
  dateTime: string;
  localDate?: string;
  localTime?: string;
}

export interface EventDates {
  start: EventDate;
  end?: EventDate;
  timezone?: string;
  status?: {
    code: string;
  };
}

export interface Venue {
  id: string;
  name: string;
  type?: string;
  url?: string;
  locale?: string;
  postalCode?: string;
  timezone?: string;
  city?: {
    name: string;
  };
  state?: {
    name: string;
    stateCode?: string;
  };
  country?: {
    name: string;
    countryCode?: string;
  };
  address?: {
    line1?: string;
    line2?: string;
  };
  location?: {
    longitude: string;
    latitude: string;
  };
}

export interface Event {
  id: string;
  name: string;
  type?: string;
  url?: string;
  locale?: string;
  info?: string;
  pleaseNote?: string;
  dates: EventDates;
  _embedded?: {
    venues?: Venue[];
  };
}