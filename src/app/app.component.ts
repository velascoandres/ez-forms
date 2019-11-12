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
      controlName: 'password',
      type: {
        typeName: 'input',
        class: 'password',
      },
      validators: [
        Validators.required,
      ]
    },
    {
      controlName: 'birthday',
      placeholder: 'Enter your birthday date',
      type: {
        typeName: 'date'
      },
      validators: [
        Validators.required,
      ]
    },
    {
      controlName: 'otherDate',
      placeholder: 'Enter a date',
      type: {
        typeName: 'date'
      },
      validators: [
        Validators.required,
      ],
      errorMessages: {
        required: 'The date is required',
        date: 'The date is not acceptable'
      },
    },
    {
      controlName: 'email',
      validators: [
        Validators.required,
        Validators.email
      ],
      placeholder: 'Enter an email',
      type: {
        typeName: 'input'
      },
      errorMessages: {
        required: 'The email is mandatory',
        email: 'You must enter a valid email',
      },
    },
    {
      controlName: 'civilState',
      placeholder: 'Choose a civil state',
      label: 'Civil state',
      validators: [
        Validators.required
      ],
      type: {
        typeName: 'select',
        options: [
          {
            value: 1,
            label: 'Married'
          },
          {
            value: 2,
            label: 'Single'
          }
        ]
      },
    },
    {
      controlName: 'cities',
      validators: [
        Validators.required
      ],
      type: {
        typeName: 'check',
        options: [
          {
            value: 1,
            label: 'Quito'
          },
          {
            value: 2,
            label: 'Cuenca'
          },
          {
            value: 3,
            label: 'Ambato'
          }
        ]
      },
      label: 'Cities',
      errorMessages: {
        required: 'select a city at least',
      }
    },
    {
      controlName: 'favoriteFruit',
      validators: [
        Validators.required
      ],
      label: 'Favorite Fruit',
      type: {
        typeName: 'radio',
        options: [
          {
            value: 3,
            label: 'Apple'
          },
          {
            value: 1,
            label: 'Pear'
          },
          {
            value: 2,
            label: 'Pineapple'
          }
        ],
      },
    }
  ];
  usuario = {
    uuid: 1234,
    email: 'juan.pecadoss@correo.com',
    civilState: 1,
    otherDate: '2015-02-16',
    birthday: '1999-02-16',
    favoriteFruit: 1,
    cities: [1, 3],
    password: '12133',
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
