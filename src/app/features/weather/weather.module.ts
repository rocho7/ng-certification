import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { WeatherRoutingModule } from "./weather-routing.module";
import { WeatherPagesComponent } from "./weather-pages/weather-pages.component";
import { ZipCodeModule } from "./weather-pages/zip-code/zip-code.module";
import { LocationSearchedModule } from "./weather-pages/location-searched/location-searched.module";

@NgModule({
  declarations: [WeatherPagesComponent],
  imports: [CommonModule, ZipCodeModule, LocationSearchedModule, WeatherRoutingModule],
})
export class WeatherModule {}
