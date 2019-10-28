import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'ez-form',
  templateUrl: 'ez-form.component.html',
  styles: []
})
export class EzFormComponent implements OnInit {
  formulario: FormGroup;
  @Input()
  configuracion = [];

  constructor(
    private fb: FormBuilder
  ) {

  }

  ngOnInit() {
    const controlesFB = this.generarControles(this.configuracion);
    this.formulario = this.fb.group(
      controlesFB,
    );
    console.log(this.formulario);
  }

  protected generarControles(configuracion: any) {
    const controles = {};
    configuracion.forEach(
      (itemConfiguracion) => {
        const nombreControl = itemConfiguracion.nombre ? itemConfiguracion.nombre : '';
        const valorDefecto = itemConfiguracion.valor;
        const validadores = [...itemConfiguracion.validadores];
        controles[nombreControl] = [valorDefecto, validadores];
        console.log([valorDefecto, validadores])
      }
    );
    console.log(controles);
    return controles;

  }
}
