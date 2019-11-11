import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ToasterService} from 'angular2-toaster';
import {FormularioPrincipal} from './clases-genericas/formulario.principal';

@Component({
  selector: 'ez-form',
  templateUrl: './ez-form.component.html',
  styleUrls: ['./ez-form.component.sass'],
})
export class EzFormComponent extends FormularioPrincipal implements OnInit {
  constructor(
    public fb: FormBuilder,
    public readonly toaster: ToasterService,
  ) {
    super(fb, toaster);
  }

  ngOnInit() {
    this.iniciarFormulario();
  }
}
