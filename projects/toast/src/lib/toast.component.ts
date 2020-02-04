import {Component, Input, OnInit} from '@angular/core';
import {of, Subscription} from 'rxjs';
import {ToastService} from './toast.service';
import {debounceTime, map} from 'rxjs/operators';

@Component({
  selector: 'ez-toast',
  templateUrl: './ez-toast.component.html',
  styleUrls: ['./ez-toast.component.sass'],
})
export class ToastComponent implements OnInit {
  title: string;
  body: string;
  type: string;
  suscripcionMensaje: Subscription;
  mostrar = false;

  constructor(
    private readonly _toastService: ToastService,
  ) {
    this.suscripcionMensaje = this._toastService.cambioMensaje$.subscribe(
      (mensaje) => {
        if (mensaje) {
          console.log('cambio algo', mensaje.title);
          this.title = mensaje.title;
          this.body = mensaje.body;
          this.type = mensaje.type;
          this.mostrar = true;
        }
      }
    );

  }

  ngOnInit() {
  }

}
