import {Component} from '@angular/core';
import {Validators} from '@angular/forms';

@Component({
  selector: 'mat-ta-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'formularios';
  datosUsuario;
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
    }
  ];
  usuario = {
    nombre: 'juanito pecados',
    email: 'velasco.andrs@gmail.com',
    'estado-civil': 1,
    deportes: [1, 2],
    frutaFavorita: 2,
    ciudades: [1]
  };

  escucharDatosDelFormulario(evento) {
    this.usuario = evento ? evento : undefined;
    if (this.usuario) {
      console.log('todo OK: ', this.usuario);
    } else {
      console.log('todo mal');
    }
  }

}
