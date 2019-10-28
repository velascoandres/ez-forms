import {Component} from '@angular/core';
import {Validators} from '@angular/forms';

@Component({
  selector: 'mat-ta-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'formularios';
  controles = [
    {
      nombre: 'nombre',
      validadores: [Validators.required],
      placeholder: 'Ingrese un nombre',
      tipo: {nombreTipo: 'input'},
    },
    {
      nombre: 'apellido',
      validadores: [Validators.required, Validators.email],
      placeholder: 'Ingrese un apellido',
      valor: 'juanito',
      tipo: {nombreTipo: 'input'},
    },
    {
      nombre: 'estado-civil',
      validadores: [Validators.required, Validators.email],
      tipo: {nombreTipo: 'select', opciones: [{valor: 1, nombre: 'casado'}, {valor: 0, nombre: 'soltero'}]}
    },
  ];
}
