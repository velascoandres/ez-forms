import { NgModule } from '@angular/core';
import { EzFormComponent } from './ez-form.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToasterModule} from 'angular2-toaster';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatOptionModule, MatSelectModule} from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';



@NgModule({
  declarations: [EzFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToasterModule.forRoot(),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
  ],
  exports: [EzFormComponent]
})
export class EzFormModule { }
