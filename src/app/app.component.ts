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
      controlName: 'uuid',
      type: {
        typeName: 'input'
      },
      disabled: true,
    },
    {
      controlName: 'contraseña',
      type: {
        typeName: 'input',
        clase: 'password',
      },
      validators: [
        Validators.required,
      ]
    },
    {
      controlName: 'fechaNacimiento',
      placeholder: 'Ingresa tu fecha de nacimiento',
      type: {typeName: 'date'},
      validators: [Validators.required]
    },
    {
      controlName: 'otraFecha',
      placeholder: 'Ingresa una fecha',
      type: {typeName: 'date'},
      validators: [Validators.required],
      errorMessages: {
        required: 'El ingrese una fecha',
        date: 'Fecha no aceptable'
      },
    },
    {
      controlName: 'email',
      validators: [Validators.required, Validators.email],
      placeholder: 'Ingrese un email',
      type: {typeName: 'input'},
      errorMessages: {
        required: 'El email es requerido',
        email: 'Debe ser un email válido',
      },
    },
    {
      controlName: 'estadoCivil',
      placeholder: 'Seleccione un estado civil',
      label: 'Estado civil',
      validators: [Validators.required],
      type: {
        typeName: 'select',
        options: [{value: 1, label: 'casado'}, {value: 2, label: 'soltero'}]
      },
    },
    {
      controlName: 'ciudades',
      validators: [Validators.required],
      type: {
        typeName: 'check',
        options: [{value: 1, label: 'Quito'}, {value: 2, label: 'Cuenca'}, {label: 'Ambato', value: 3}]
      },
      label: 'Ciudades',
      errorMessages: {
        required: 'Eliga por lo menos una ciudad',
      }
    },
    {
      controlName: 'frutaFavorita',
      validators: [Validators.required],
      label: 'Fruta Favorita',
      type: {
        typeName: 'radio',
        options: [{valor: 3, nombre: 'Manzana'}, {valor: 1, nombre: 'Pera'}, {valor: 2, nombre: 'Piña'}],
      },
    }
  ];
  usuario = {
    uuid: 1234,
    email: 'juan.pecadoss@correo.com',
    estadoCivil: 1,
    frutaFavorita: 1,
    ciudades: [1, 3]
  };

  myToasterConfig = {
    success: {
      type: 'info',
      title: 'BIEN',
      body: 'Todo anda bien!!'
    },
    fail: {
      type: 'warning',
      title: 'MAL',
      body: 'Algo anda mal!!'
    }
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
