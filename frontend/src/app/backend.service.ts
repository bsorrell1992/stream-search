import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Countries } from './models/countries.model';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  readonly Root_URL: string;
  constructor(public http: HttpClient) {
    this.Root_URL = "http://localhost:8080/api";
  }

  async fetchShows(input: {title: string, country: string}): Promise<any> {
    this.http.get(`${this.Root_URL}/shows/${input.country}/${input.title}`).subscribe((shows: any): any => {
      return shows;
    });
  }

  async fetchCountries() : Promise<Countries> {
    console.log("fetching...");
    this.http.get<Countries>(`${this.Root_URL}/countries`).subscribe((countries: Countries): Countries => {
      console.log(countries);
      return countries;
    });

    return {};
  }
}
