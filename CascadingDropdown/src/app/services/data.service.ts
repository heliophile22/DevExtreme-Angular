import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { CountryStates } from './Data-Contracts/countrystate';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  
  url_ = 'assets/store.json';
  
  getAll(): any {
    return this.http.get<CountryStates>(this.url_);
  }
}