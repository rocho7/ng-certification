import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WeatherPagesComponent } from "./weather-pages/weather-pages.component";

const routes: Routes = [
  {
    path: "",
    component: WeatherPagesComponent,
  },
  {
    path: "**",
    component: WeatherPagesComponent,
  },

  { path: "", redirectTo: "/", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeatherRoutingModule {}
