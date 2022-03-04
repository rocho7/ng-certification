import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { API_KEY_WHEATHER } from "../../../../core/constants/api-key.const";
import { EXCLUDE_WHEATHER_INFO } from "../../../../core/constants/exclude-wheater-data.const";
import { Coord, IWeather } from "../interfaces/weather.interface";
import { IForecast } from "../interfaces/forecast.interface";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WeatherService {
  weather$ = new BehaviorSubject<IWeather>(null);
  forecast$ = new BehaviorSubject<IForecast>(null);

  constructor(private readonly http: HttpClient) {}

  getWeatherBy(info: string): Observable<IWeather> {
    const url = `${environment.apiUrls.weather}?q=${info}&appid=${this.getApiKey()}`;
    return this.http.get<IWeather>(url);
  }

  getForecast(coord: Coord): Observable<IForecast> {
    const excludedInfo = EXCLUDE_WHEATHER_INFO.join();
    const url = `${environment.apiUrls.forecast}?lat=${coord?.lat}&lon=${coord?.lon}&exclude=${excludedInfo}&appid=${this.getApiKey()}`;
    return this.http.get<IForecast>(url);
  }

  getApiKey(): string {
    return API_KEY_WHEATHER;
  }
}
