import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Countries } from './models/countries.model';
import axios from 'axios';

const staticData = [
  {
    type: "movie",
    title: "The Batman",
    overview: "A killer targets Gotham's elite sending Batman on an investigation. As evidence mounts, he must forge new relationships, unmask the culprit, and bring justice to corruption.",
    streamingInfo: {
      us: [
        {
          service: "apple",
          streamingType: "rent",
          link: "https://tv.apple.com/us/movie/the-batman/umc.cmc.75o96q32hcm2kzx4ilop1ylmx",
          price: {
            amount: "3.99",
            currency: "USD",
            formatted: "3.99 USD"
          }
        },
        {
          service: "apple",
          streamingType: "buy",
          link: "https://tv.apple.com/us/movie/the-batman/umc.cmc.75o96q32hcm2kzx4ilop1ylmx",
          price: {
            amount: "14.99",
            currency: "USD",
            formatted: "14.99 USD"
          }
        },
        {
          service: "hbo",
          streamingType: "subscription",
          link: "https://tv.apple.com/us/movie/the-batman/umc.cmc.75o96q32hcm2kzx4ilop1ylmx"
        }
      ]
    },
    year: 2022
  },
  {
    type: "series",
    title: "Batman: The Animated Series",
    overview: "The Dark Knight battles...",
    streamingInfo: {}
  }
];

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(public httpClient: HttpClient) { }

  async fetchShows(input: {title: string, country: string}) {
    /*const response = await axios.request({
      method: 'GET',
      url: 'https://streaming-availability.p.rapidapi.com/search/title',
      params: {
        title: input.title,
        country: input.country,
        show_type: 'all',
        series_granularity: 'show',
        output_language: 'en'
      },
      headers: {
        'X-RapidAPI-Key': '',
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
      }
    });
    return response.data;*/
    return staticData;
  }

  async fetchCountries() : Promise<Countries> {
    /*const response = await axios.request({
      method: 'GET',
      url: 'https://streaming-availability.p.rapidapi.com/countries',
      headers: {
        'X-RapidAPI-Key': '',
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
      }
    });
    return response.data;*/
    let params = new HttpParams({
      fromObject: {
        method: 'GET',
        url: 'https://streaming-availability.p.rapidapi.com/countries'
      }
    });
    return {};
  }
}
