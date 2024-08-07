import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StreamingService } from './models/streaming-service.model';

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

  fetchCountries() : Observable<{ countryCode: string, name: string }[]> {
    return this.http.get<{ countryCode: string, name: string }[]>(`${this.Root_URL}/countries`);
  }

  fetchStreamingServices(country: string): Observable<StreamingService[]> {
    return this.http.get<StreamingService[]>(`${this.Root_URL}/streaming-services/${country}`);
  }
}
