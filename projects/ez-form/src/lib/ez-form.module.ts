import { NgModule } from '@angular/core';
import { EzFormComponent } from './ez-form.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [EzFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [EzFormComponent]
})
export class EzFormModule { }
