import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
// import {ToasterService} from 'angular2-toaster';
import {FormularioPrincipal} from './clases-genericas/formulario.principal';
import {Subscription} from 'rxjs';
import {MessageService} from 'primeng';

@Component({
  selector: 'ez-form',
  templateUrl: './ez-form.component.html',
  styleUrls: ['./ez-form.component.sass'],
})
export class EzFormComponent extends FormularioPrincipal implements OnInit, OnDestroy {
  constructor(
    public fb: FormBuilder,
    public readonly toaster: MessageService,
  ) {
    super(fb, toaster);
  }

  ngOnInit() {
    this.iniciarFormulario();
  }

  ngOnDestroy(): void {
    this.listaSubscripciones.forEach(
      (subscripcion: Subscription) => {
        subscripcion.unsubscribe();
      }
    );
  }
}
