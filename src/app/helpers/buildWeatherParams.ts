import {HttpParams} from "@angular/common/http";
import {JenAiAucuneIdee, LongAndLatAndCity, WeatherFilters} from "../weather.service";
import {keyframes} from "@angular/animations";

export function buildParams(weatherFilters: WeatherFilters, longAndLatAndCity: LongAndLatAndCity): HttpParams {
  const weatherParams = Object.entries(weatherFilters)
           .filter(([k, v]) => v)
           .map(([k,]) => JenAiAucuneIdee[k])
            .join(',')

  let httpParams = new HttpParams();
  httpParams = httpParams.append('latitude', longAndLatAndCity.latitude);
  httpParams = httpParams.append('longitude', longAndLatAndCity.longitude);
  httpParams = httpParams.set('current', 'temperature_2m,'.concat(weatherParams).replace(/,\s*$/, ""));

  return httpParams;
}

