import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ToastService } from '../../projects/toast/src/lib/toast.service';
import { WikipediaRestService } from './servicios/wikipedia-rest.service';
import { FileValidator } from '../../projects/ez-form/src/lib/clases-genericas/file.validator';
import {
  BaseFormField,
  InputTextFieldInterface,
  DateFieldInterface,
  TextAreaFieldInterface,
  SimpleSelectFieldInterface,
  RadioFieldInterface,
  CheckFieldInterface, FileFieldInterface, AutoCompleteFieldInterface
} from 'projects/ez-form/src/lib/interfaces/controls-interfaces';
import {InputText} from '../../projects/ez-form/src/lib/decoradores/form-fields';

@Component({
  selector: 'mat-ta-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  @InputText(
    {
      controlName: 'passwd',
      label: 'new passw',
      type: {
        typeName: 'input-text',
      }
    },
  )
  passwd: any;
  title = 'formularios';
  // uuidField
  uuidField: InputTextFieldInterface = {
    controlName: 'uuid',
    type: {
      typeName: 'input-text'
    },
    disabled: true,
  };
  // passwordField
  passwordField: InputTextFieldInterface = {
    controlName: 'password',
    type: {
      typeName: 'input-text',
      class: 'password',
    },
    validators: [
      Validators.required,
    ]
  };
  // birthdayField
  birthdayField: DateFieldInterface = {
    controlName: 'birthday',
    placeholder: 'Enter your birthday date',
    hint: 'Enter a valid date',
    type: {
      typeName: 'date'
    },
    validators: [
      Validators.required,
    ]
  };
  // addressField
  addressField: TextAreaFieldInterface = {
    controlName: 'address',
    label: 'Address',
    placeholder: 'Enter a complete address',
    type: {
      typeName: 'textArea',
      maxLength: 20,
    },
    validators: [
      Validators.required,
    ],
  };
  // emailField
  emailField: InputTextFieldInterface = {
    controlName: 'email',
    validators: [
      Validators.required,
      Validators.email
    ],
    placeholder: 'Enter an email',
    type: {
      typeName: 'input-text',
      maxLength: 30,
    },
    errorMessages: {
      required: 'The email is mandatory',
      email: 'You must enter a valid email',
    },
    hint: 'Enter a valid email'
  };
  // civilStateField
  civilStateField: SimpleSelectFieldInterface = {
    controlName: 'civilState',
    placeholder: 'Choose a civil state',
    label: 'Civil state',
    hint: 'Please pick a Civil State',
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
  };
  // favoriteFruit
  favoriteFruitField: RadioFieldInterface = {
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
  };
  // citiesField
  citiesField: CheckFieldInterface = {
    controlName: 'cities',
    type: {
      typeName: 'check',
      minRequired: 2,
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
      required: 'select two cities at least',
    }
  };
  // profilePictureField
  profilePictureField: FileFieldInterface = {
    controlName: 'profilePicture',
    label: 'Profile Picture',
    hint: 'Please upload your profile picture',
    placeholder: 'Add your profile picture',
    validators: [
      Validators.required,
      FileValidator.extensions(['jpg']),
      FileValidator.minSize(100),
      FileValidator.maxSize(500),
    ],
    errorMessages: {
      required: 'Mandatory File',
      fileExtension: 'Please select a jpg file',
      fileMinSize: 'File size must be above of 100 kilobytes',
      fileMaxSize: 'File size is larger than 500 kilobytes'
    },
    type: {
      typeName: 'file',
      multiple: false,
      accept: 'image/*',
      showFile: true,
    },
  };
  // someFiles
  someFilesField: FileFieldInterface = {
    controlName: 'someFiles',
    label: 'Pictures',
    hint: 'Please upload your files',
    placeholder: 'Add Files',
    validators: [
      Validators.required,
      FileValidator.extensions(['png']),
      FileValidator.maxSize(500),
    ],
    errorMessages: {
      fileExtension: 'Please select png files only',
      required: 'Mandatory File',
      fileMaxSize: 'File size is larger than 500 kilobytes'
    },
    type: {
      typeName: 'file',
      multiple: true,
      accept: '*/*',
      showFile: true,
      tableHeaders: {
        actions: 'Operations',
        description: 'Entry Files'
      }
    },
  };
  // Form Config
  myConfiguration: BaseFormField[] = [
    this.uuidField,
    this.passwordField,
    this.passwd,
    this.birthdayField,
    this.addressField,
    this.emailField,
    this.civilStateField,
    this.citiesField,
    this.favoriteFruitField,
    this.profilePictureField,
    this.someFilesField,
  ];

  // User Email Field
  userEmailField: InputTextFieldInterface = {
    controlName: 'userEmail',
    validators: [
      Validators.email
    ],
    label: 'Email address',
    placeholder: 'Enter an email',
    type: {
      typeName: 'input-text',
      maxLength: 30,
    },
    errorMessages: {
      required: 'The email is mandatory',
      email: 'You must enter a valid email',
    },
    hint: 'Enter a valid email'
  };

  // Article Field (AutoComplete)
  articleField: AutoCompleteFieldInterface = {
    controlName: 'article',
    validators: [
      Validators.required
    ],
    label: 'Wikipedia article',
    placeholder: 'Example: DNA',
    type: {
      typeName: 'autoComplete',
      completeMethod: this.filterWikipediaArticleByTitle,
      showAttribute: 'title',
      componentReference: this,
    },
    errorMessages: {
      required: 'The article is mandatory',
    },
    hint: 'Search an article'
  };

  // Other Form Config
  configuracionFormularioBusqueda = [
    this.userEmailField,
    this.articleField,
  ];
  infoLoca = {
    userEmail: 'juan.pecados@mail.com',
    city: { id: 2894, name: 'Parbasdorf', country: 'AT', lat: '48.28333', lng: '16.6' },
  };
  usuario = {
    uuid: 1234,
    email: 'juan.pecados@mail.com',
    civilState: 1,
    otherDate: '2015-02-16',
    birthday: '1999-02-16',
    favoriteFruit: 1,
    password: '12133',
    cities: [1, 2],
    someFiles: [],
  };

  myToasterConfig = {
    success: {
      type: 'info',
      title: 'GOOD',
      body: 'All right!!'
    },
    fail: {
      type: 'warning',
      title: 'BAD',
      body: 'Someting was wrong!!'
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

  constructor(
    private readonly _toastService: ToastService,
    private readonly _wikipediaService: WikipediaRestService
  ) {
  }

  filterWikipediaArticleByTitle(event, contexto) {
    return contexto._wikipediaService.find(event.query ? event.query : event);
  }

  mostrarMensaje() {
    const mensaje = {
      title: 'Errorcito',
      body: 'Algo salio mal, revisa el servidor',
      type: 'success',
    };
    this._toastService.showMessage(mensaje);
  }
}
