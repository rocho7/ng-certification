import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Daily } from "../../interfaces/forecast.interface";
import { CoordsCityName } from "../../interfaces/weather.interface";
import { WeatherService } from "../../services/wheater.service";
import { ForecastService } from "./services/forecast.service";
@Component({
  selector: "app-forecast",
  templateUrl: "./forecast.component.html",
  styleUrls: ["./forecast.component.css"],
})
export class ForecastComponent implements OnInit {
  cityName: string;
  forecastWeather: Daily[];

  constructor(
    private route: ActivatedRoute,
    private readonly weatherService: WeatherService,
    private readonly forecastService: ForecastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((coords) => {
      this.cityName = coords?.name;
      this.getForecast(coords as CoordsCityName);
    });
  }

  getForecast(coords: CoordsCityName): void {
    this.weatherService.getForecast(coords).subscribe((res) => {
      if (res) {
        this.forecastWeather = this.forecastService.getForecastWeather(res);
      }
    });
  }

  goBack(): void {
    this.router.navigateByUrl("/");
  }
}
