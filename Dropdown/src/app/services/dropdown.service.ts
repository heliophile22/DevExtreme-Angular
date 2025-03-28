import { Injectable } from "@angular/core";

export class Country {
  Code?: string;
  Name?: string;
}

export class State {
  StateCode?: string;
  StateName?: string;
  CountryCode?: string;
}

const countries: Country[] = [
  {
    Code: 'US',
    Name: 'United States Of America'
  },
  {
    Code: 'IN',
    Name: 'India'
  }
];

const states: State[] = [
  {
    StateCode: "AL",
    StateName: "Alabama",
    CountryCode: "US"
  },
  {
    StateCode: "TX",
    StateName: "Texas",
    CountryCode: "US"

  },
  {
    StateCode: "AL",
    StateName: "Andhra Pradesh",
    CountryCode: "IN"
  },
  {
    StateCode: "TS",
    StateName: "Telangana",
    CountryCode: "IN"
  }
];

@Injectable({
  providedIn: 'root'
})

export class DropdownService {

  getCountries(): Country[] {
    return countries;
  }

  getStatesByCountryCode(countryCode: string): State[] {
    return states.filter(state => state.CountryCode === countryCode);
  }
}




/*
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DropdownService {

  constructor() { }

  private countries = [
    { Code: 'US', Name: "United States Of America" },
    { Code: 'IN', Name: "India" },
  ];

  private states = [
    { CountryCode: 'US', StateName: 'Alabama', StateCode: 'AL' },
    { CountryCode: 'US', StateName: 'Texas', StateCode: 'TX' },
    { CountryCode: 'IN', StateName: 'Andhra Pradesh', StateCode: 'AP' },
    { CountryCode: 'IN', StateName: 'Telangana', StateCode: 'TS' },
  ];

  getCountries() {
    return this.countries;
  }

  getStatesByCountryCode(countryCode: string) {
    return this.states.filter(state => state.CountryCode === countryCode);
  }
}
*/