import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {EzFormModule} from '../../projects/ez-form/src/lib/ez-form.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import {ToastModule} from '../../projects/toast/src/lib/toast.module';
import {ToastService} from '../../projects/toast/src/lib/toast.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    EzFormModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    ToastModule,
  ],
  providers: [
    MatDatepickerModule,
    ToastService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
