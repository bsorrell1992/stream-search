import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StreamingService } from './models/streaming-service.model';
import { CountryNames } from './models/countries.model';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  readonly Root_URL: string;
  constructor(public http: HttpClient) {
    this.Root_URL = "http://localhost:8080/api";
  }

  fetchShows(input: { title: string, country: string }): Observable<any> {
    return this.http.get<any>(`${this.Root_URL}/shows/${input.country}/${input.title}`);
  }

  fetchCountries() : Observable<CountryNames> {
    return this.http.get<CountryNames>(`${this.Root_URL}/countries`);
  }

  fetchStreamingServices(country: string): Observable<StreamingService[]> {
    return this.http.get<StreamingService[]>(`${this.Root_URL}/countries/streaming-services/${country}`);
  }
}
