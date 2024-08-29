import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { StreamingService } from './models/streaming-service.model';
import { CountryNames } from './models/countries.model';
import { Shows } from './models/shows.model';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  readonly Root_URL: string;
  constructor(public http: HttpClient) {
    this.Root_URL = "http://localhost:8080/api";
  }

  fetchShows(input: { title: string, country: string }): Observable<Shows | null> {
    return this.http.get<Shows>(`${this.Root_URL}/shows/${input.country}/${input.title}`).pipe(
      catchError(this.handleError)
    );
  }

  fetchCountries() : Observable<CountryNames | null> {
    return this.http.get<CountryNames>(`${this.Root_URL}/countries`).pipe(
      catchError(this.handleError)
    );
  }

  fetchStreamingServices(country: string): Observable<StreamingService[] | null> {
    return this.http.get<StreamingService[]>(`${this.Root_URL}/countries/streaming-services/${country}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<null> {
    console.log(error.message);
    return of(null);
  }
}
