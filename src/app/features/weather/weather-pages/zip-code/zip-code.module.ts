import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZipCodeComponent } from './zip-code.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ZipCodeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [ZipCodeComponent]
})
export class ZipCodeModule { }
