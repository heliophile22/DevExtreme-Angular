import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { State } from '../services/Data-Contracts/state';
import { Country } from '../services/Data-Contracts/country';
import { CountryStates } from '../services/Data-Contracts/countrystate';

@Component({
  selector: 'app-dplist',
  templateUrl: './dplist.component.html',
  styleUrl: './dplist.component.css'
})
export class DplistComponent implements OnInit {
  
  countries?: Country[];
  states?: State[];
  selectedCountry?: Country;
  selectedState?: State;
  selectedCountryCode: string = '';
  selectedStateCode: string = '';
  countryStates?: CountryStates;
  

  constructor(private dataServie: DataService){}

  ngOnInit(): void {
    //debugger;
    this.dataServie.getAll().subscribe((data: CountryStates) => {
      //debugger;
      this.countryStates = data;
      this.countries = data.countries;
    });
  }

  onSelect(CountryCode: any){
    //debugger;
    this.states = this.countryStates?.states?.filter((res: any) => res.CountryCode == CountryCode!.value);
  }

  handleButtonClick(){
    //debugger;
    //alert('clicked');
    this.selectedCountry = this.countries?.find(country => country.Code === this.selectedCountryCode);
    this.selectedState = this.states?.find(state => state.StateCode === this.selectedStateCode);
  }
}