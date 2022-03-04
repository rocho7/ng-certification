import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { LOCALSTORAGE_NAME } from "../../../../core/constants/localstorage-name.const";
import { ALPHA_NUMERIC_REG_EXP } from "../../../../core/constants/regular-expressions.const";
import { IWeather } from "../interfaces/weather.interface";
import { WeatherService } from "../services/wheater.service";
import { IKeysFrom, KEY_FORM } from "../../../../core/constants/keys-form.const";
@Component({
  selector: "app-zip-code",
  templateUrl: "./zip-code.component.html",
  styleUrls: ["./zip-code.component.css"],
})
export class ZipCodeComponent implements OnInit {
  formZipcode: FormGroup;
  keys: IKeysFrom;

  constructor(private readonly fb: FormBuilder, private readonly weatherService: WeatherService) {}

  ngOnInit(): void {
    this.keys = KEY_FORM;
    this.setForm();

    if (JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME))) {
      this.isLocalStore();
    }
  }

  setForm(): void {
    this.formZipcode = this.fb.group({
      [this.keys?.zipcode]: new FormControl("", [Validators.required, Validators.minLength(4), Validators.pattern(ALPHA_NUMERIC_REG_EXP)]),
    });
  }

  onSubmit(): void {
    if (this.formZipcode?.value[this.keys?.zipcode]) {
      this.getWeather(this.formZipcode?.value[this.keys?.zipcode]);
      this.setForm();
    }
  }

  isLocalStore(): void {
    JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME)).forEach((it: IWeather, index: number) => {
      this.getWeather(it?.name, index);
    });
  }

  getWeather(data: string | number, index?: number): void {
    this.weatherService.getWeatherBy(data).subscribe((res: IWeather) => {
      if (res) {
        this.weatherService.weather$.next(this.weatherService.setInfoAndImage(res, index));
      }
    });
  }
}
