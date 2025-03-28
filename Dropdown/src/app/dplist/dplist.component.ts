import { Component } from '@angular/core';
import { DropdownService, Country, State } from '../services/dropdown.service';
import { DxButtonModule, DxFormModule, DxSelectBoxModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dplist',
  standalone: true,
  //providers: [DropdownService],
  imports: [
    CommonModule,
    DxSelectBoxModule,
    DxFormModule,
    DxButtonModule,
    FormsModule
  ],
  templateUrl: './dplist.component.html',
  styleUrl: './dplist.component.css',
})

export class DplistComponent {
  formData: any = {country : '', state : ''};
  countries: Country[];
  states?: State[];
  selectedCountryName?: string = '';
  selectedStateName?: string = '';

  constructor(private service: DropdownService) {
    //debugger;
    this.countries = service.getCountries();
  }

  formFieldDataChanged(e: any) {
    //debugger;
    if(e.dataField === 'country') {
      const countryCode = e.value;
      this.states = this.service.getStatesByCountryCode(countryCode);
    }
  }

  handleButtonClick() {
    //debugger;
    const selectedCountry = this.countries.find(country => country.Code === this.formData.country);
    this.selectedCountryName = selectedCountry ? selectedCountry.Name : '';

    const selectedState = this.states?.find(state => state.StateCode === this.formData.state);
    this.selectedStateName = selectedState ? selectedState.StateName : '';
  }
}


  // buttonOptions = {
  //   text: 'Display',
  //   type: 'Default',
  //   width: '150px',
  //   onclick: () => {
  //     const selectedCountry = this.countries.find(country => country.Code === this.formData.country);
  //     this.selectedCountryName = selectedCountry ? selectedCountry.Name : '';

  //     const selectedState = this.states?.find(state => state.StateCode === this.formData.state);
  //     this.selectedStateName = selectedState ? selectedState.StateName : '';
  //   }
  // }