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
      placeholder: 'Ingrese un nombre',
      tipo: {nombreTipo: 'input'},
    },
    {
      nombre: 'email',
      validadores: [Validators.required, Validators.email],
      placeholder: 'Ingrese un email',
      valor: 'pepe@correo.com',
      tipo: {nombreTipo: 'input'},
      mensajesError: {
        required: 'El email es requerido',
        email: 'Debe ser un email válido',
      }
    },
    {
      nombre: 'estado-civil',
      placeholder: 'Ingrese un estado civil',
      validadores: [Validators.required],
      tipo: {
        nombreTipo: 'select',
        opciones: [{valor: '', nombre: 'Selecione un estado civil'}, {valor: 1, nombre: 'casado'}, {valor: 2, nombre: 'soltero'}]
      },
      valor: 1,
    },
    {
      nombre: 'ciudades',
      validadores: [Validators.required],
      tipo: {
        nombreTipo: 'check',
        opciones: [{valor: 3, nombre: 'Quito', seleccionado: true}, {valor: 1, nombre: 'Cuenca', seleccionado: false}, {
          valor: 2,
          nombre: 'Ambato',
          seleccionado: false,
        }],
      },
      label: 'Ciudades',
      mensajesError: {
        required: 'Eliga por lo menos una ciudad',
      }
    },
    {
      nombre: 'deportes',
      validadores: [Validators.required],
      tipo: {
        nombreTipo: 'check',
        opciones: [{valor: 3, nombre: 'Futbol', seleccionado: true}, {valor: 1, nombre: 'Basquet', seleccionado: true}, {
          valor: 2,
          nombre: 'Tennis',
          seleccionado: false,
        }],
      },
      label: 'Deportes',
    },
    {
      nombre: 'frutaFavorita',
      validadores: [Validators.required],
      label: 'Fruta Favorita',
      tipo: {
        nombreTipo: 'radio',
        opciones: [{valor: 3, nombre: 'Manzana'}, {valor: 1, nombre: 'Pera'}, {valor: 2, nombre: 'Piña'}],
      },
      valor: 1,
    }
  ];
}
