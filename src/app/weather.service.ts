import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {buildParams} from "./helpers/buildWeatherParams";

export interface LongAndLatAndCity {
  longitude: string;
  latitude: string;
  city: string;
}

export interface SpecsOnCity {
  temperature: number;
  humidity?: number;
  apparentTemperature?: number;
  precipitation?: number;
  rain?: number;
  windSpeed?: number;
  windDirection?: number;
}

export interface WeatherFilters {
  humidity?: boolean;
  apparentTemperature?: boolean;
  precipitation?: boolean;
  rain?: boolean;
  windSpeed?: boolean;
  windDirection?: boolean;
}

export const JenAiAucuneIdee: { [key: string]: string } = {
  humidity: 'relative_humidity_2m',
  apparentTemperature: 'apparent_temperature',
  precipitation: 'precipitation',
  rain: 'rain',
  windSpeed: 'wind_speed_10m',
  windDirection: 'wind_direction_10m'
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private httpClient = inject(HttpClient);

  getLongAndLat(cityName: string): Observable<LongAndLatAndCity>{
    return this.httpClient.get(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=fr&format=json`).pipe(
      tap(console.log),
      map(body => {
        return {
          longitude: body.results[0].longitude,
          latitude: body.results[0].latitude,
          city: body.results[0].name
        }
      })
    );
  }

  getWeather(longAndLatAndCity: LongAndLatAndCity, weatherFilters: WeatherFilters): Observable<SpecsOnCity> {
    return this.httpClient.get(`https://api.open-meteo.com/v1/forecast`, {
      params: buildParams(weatherFilters, longAndLatAndCity)
    }).pipe(
      tap(console.log),
      map(body => {
        return {
          temperature: body.current.temperature_2m,
          humidity: body.current.relative_humidity_2m,
          apparentTemperature: body.current.apparent_temperature,
          precipitation: body.current.precipitation,
          rain: body.current.rain,
          windSpeed: body.current.wind_speed_10m,
          windDirection: body.current.wind_direction_10m,
        }
      })
    )
  }


}
