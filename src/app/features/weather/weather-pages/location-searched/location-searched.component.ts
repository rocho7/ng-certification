import { Component, OnInit } from "@angular/core";
import { IWeather } from "../interfaces/weather.interface";
import { WeatherService } from "../services/wheater.service";
import { environment } from "../../../../../environments/environment";
import { WEATHER_IMAGES_AVAILABLES } from "../../../../core/constants/weather-images-availables.const";
import { IMAGE_NO_AVAILABLE_PATH } from "../../../../core/constants/weather-images-no-available.const";
import { LOCALSTORAGE_NAME } from "../../../../core/constants/localstorage-name.const";
@Component({
  selector: "app-location-searched",
  templateUrl: "./location-searched.component.html",
  styleUrls: ["./location-searched.component.css"],
})
export class LocationSearchedComponent implements OnInit {
  infoZipCode: IWeather[] = [];

  constructor(private readonly weatherService: WeatherService) {}

  ngOnInit(): void {
    this.isAnyZipCodeEnter();
  }

  isAnyZipCodeEnter(): void {
    this.weatherService.weather$.subscribe((item: IWeather) => {
      if (item) {
        if (this.getIndexRepeated(item) > -1) {
          //?Actualiza los datos
          this.infoZipCode[this.getIndexRepeated(item)] = this.setInfoAndImage(item);
        } else {
          this.infoZipCode.unshift(this.setInfoAndImage(item));
        }
        this.setLocalStore();
      }
    });
  }

  setInfoAndImage(item: IWeather) {
    const image = WEATHER_IMAGES_AVAILABLES.includes(item?.weather[0]?.main?.toLowerCase())
      ? `${environment?.apiUrls?.weatherImages}${item?.weather[0]?.main?.toLowerCase()}`
      : IMAGE_NO_AVAILABLE_PATH;
    return {
      ...item,
      imagesWeather: `${image}.png`,
    };
  }

  trackByItem(index: number, el: IWeather): number {
    return el?.id || index;
  }

  getIndexRepeated(item: IWeather): number {
    return this.infoZipCode.findIndex((cod) => item?.id === cod.id);
  }

  removeItem(index: number) {
    this.infoZipCode.splice(index, 1);
    this.setLocalStore();
  }

  setLocalStore(): void {
    localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(this.infoZipCode));
  }
}
