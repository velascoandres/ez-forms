import { NgModule } from '@angular/core';
import { ToastComponent } from './toast.component';
import {ToasterService} from 'angular2-toaster';
import {CommonModule} from "@angular/common";



@NgModule({
  declarations: [
    ToastComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ToastComponent,
  ],
  providers: [
    ToasterService,
  ]
})
export class ToastModule { }
