import { Injectable } from "@angular/core";
import { environment } from "../../../../../../../environments/environment";
import { WEATHER_IMAGES_AVAILABLES } from "../../../../../../core/constants/weather-images-availables.const";
import { IMAGE_NO_AVAILABLE_PATH } from "../../../../../../core/constants/weather-images-no-available.const";
import { Daily, IForecast } from "../../../interfaces/forecast.interface";

@Injectable({
  providedIn: "root",
})
export class ForecastService {
  today: Date;
  tomorrow: Date;
  topForecast: Date;
  forecastWeather: IForecast;
  options = { weekday: "long", month: "short", day: "numeric" } as const;

  constructor() {
    this.getDate();
  }

  getDate(): void {
    this.today = new Date(new Date(new Date().setHours(0, 0, 0, 0)));
    this.tomorrow = new Date(new Date().setHours(0, 0, 0, 0));
    this.tomorrow.setDate(this.today.getDate() + 1);
    this.topForecast = new Date(new Date().setHours(0, 0, 0, 0));
    this.topForecast.setDate(this.tomorrow.getDate() + 5);
  }

  getForecastWeather(forecast: IForecast): Daily[] {
    return forecast?.daily
      ?.filter(
        (it: Daily) =>
          new Date(new Date(it?.dt * 1000).setHours(0, 0, 0, 0)) >= this.tomorrow &&
          new Date(new Date(it?.dt * 1000).setHours(0, 0, 0, 0)) < this.topForecast
      )
      .map((it) => this.setInfoAndImage(it));
  }

  setInfoAndImage(item): Daily {
    const image = WEATHER_IMAGES_AVAILABLES.includes(item?.weather[0]?.main?.toLowerCase())
      ? `${environment?.apiUrls?.weatherImages}${item?.weather[0]?.main?.toLowerCase()}`
      : IMAGE_NO_AVAILABLE_PATH;
    const formatDate = new Date(item?.dt * 1000);
    return {
      ...item,
      dt: formatDate.toLocaleDateString("en-US", this.options),
      imagesWeather: `${image}.png`,
    };
  }
}
