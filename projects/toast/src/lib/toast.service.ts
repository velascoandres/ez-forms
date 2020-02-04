import {Injectable} from '@angular/core';
import {ToastMesasageInterface} from './interfaces/toastMesasage.interface';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  message: ToastMesasageInterface;
  private cambioMensaje = new BehaviorSubject<ToastMesasageInterface>(this.message);
  cambioMensaje$ = this.cambioMensaje.asObservable();
  constructor() {
  }

  showMessage(message: ToastMesasageInterface) {
    this.message = message;
    this.cambioMensaje.next(this.message);
  }
}
