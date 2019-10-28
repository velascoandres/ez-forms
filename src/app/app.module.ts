import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {EzFormModule} from '../../projects/ez-form/src/lib/ez-form.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    EzFormModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
