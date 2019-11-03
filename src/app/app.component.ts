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
      mensajesError: {
        required: 'El nombre es requerido',
      }
    },
    {
      nombre: 'apellido',
      validadores: [Validators.required, Validators.email],
      placeholder: 'Ingrese un apellido',
      valor: 'juanito',
      tipo: {nombreTipo: 'input'},
      mensajesError: {
        required: 'El apellido es requerido',
        email: 'El apellido debe ser un email',
      }
    },
    {
      nombre: 'estado-civil',
      placeholder: 'Ingrese un estado civil',
      validadores: [Validators.required],
      tipo: {
        nombreTipo: 'select',
        opciones: [{valor: '', nombre: 'Selecione'}, {valor: 1, nombre: 'casado'}, {valor: 2, nombre: 'soltero'}]
      },
      valor: 0
    },
    {
      nombre: 'futbol',
      validadores: [Validators.required],
      tipo: {
        nombreTipo: 'check'
      },
      valor: false,
    },
    /*
    {
      nombre: 'frutaFavorita',
      validadores: [Validators.required],
      tipo: {
        nombreTipo: 'radio',
        label: 'Elige una fruta favorita',
        opciones: [{valor: 3, nombre: 'Manzana'}, {valor: 1, nombre: 'Pera'}, {valor: 2, nombre: 'Piña'}]
      },
      valor: 1,
    }*/
  ];
}
