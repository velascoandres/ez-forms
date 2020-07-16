import { NgModule } from '@angular/core';
import { ToastComponent } from './toast.component';
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
  ]
})
export class ToastModule { }
