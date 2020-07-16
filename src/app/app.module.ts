import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {EzFormModule} from '../../projects/ez-form/src/lib/ez-form.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {ToastModule} from '../../projects/toast/src/lib/toast.module';
import {ToastService} from '../../projects/toast/src/lib/toast.service';
import {WikipediaRestService} from './servicios/wikipedia-rest.service';
import {HttpClientModule} from '@angular/common/http';
import { SignUpFormComponent } from './forms/sign-up-form/sign-up-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpFormComponent
  ],
  imports: [
    BrowserModule,
    EzFormModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    ToastModule,
    HttpClientModule
  ],
  providers: [
    MatDatepickerModule,
    ToastService,
    WikipediaRestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
