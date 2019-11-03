import { NgModule } from '@angular/core';
import { EzFormComponent } from './ez-form.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToasterModule} from 'angular2-toaster';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule, MatOptionModule, MatSelectModule} from '@angular/material';
import {CheckboxModule} from 'primeng/checkbox';



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
    CheckboxModule,
    MatCheckboxModule,
  ],
  exports: [EzFormComponent]
})
export class EzFormModule { }
