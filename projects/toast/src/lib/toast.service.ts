import {Injectable} from '@angular/core';
import {ToastMesasageInterface} from './interfaces/toastMesasage.interface';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  message: ToastMesasageInterface;
  constructor() {
  }

  showMessage(message: ToastMesasageInterface) {
    this.message = message;
  }
}
