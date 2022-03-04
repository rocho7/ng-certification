import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LocationSearchedComponent } from "./location-searched.component";
import { LocationSearchedRoutingModule } from "./location-searched-routing.module";
// import { ForecastModule } from "./forecast/forecast.module";

@NgModule({
  declarations: [LocationSearchedComponent],
  imports: [CommonModule, LocationSearchedRoutingModule],
  exports: [LocationSearchedComponent],
})
export class LocationSearchedModule {}
