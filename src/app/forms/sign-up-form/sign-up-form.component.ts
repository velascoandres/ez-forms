import {Component, OnInit} from '@angular/core';
import {
  CheckButtonField,
  DateField, FileField,
  InputTextField,
  SimpleSelectField,
  TextAreaField
} from '../../../../projects/ez-form/src/lib/decoradores/form-fields';
import {Validators} from '@angular/forms';
import {FileValidator} from '../../../../projects/ez-form/src/lib/clases-genericas/file.validator';

@Component({
  selector: 'mat-ta-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.sass']
})
export class SignUpFormComponent implements OnInit {

  @InputTextField(
    {
      controlName: 'email',
      label: 'Email',
      placeholder: 'Ex: some@mail.com',
      type: {
        maxLength: 10,
        minLenght: 5,
      },
      validators: [
        Validators.email,
      ]
    }
  )
  emaiField: string;

  @InputTextField(
    {
      controlName: 'password',
      label: 'Password',
      hint: 'Enter your password',
      type: {
        class: 'password',
      },
      validators: [
        Validators.minLength(4),
        Validators.maxLength(8),
      ],
      errorMessages: {
        minlength: 'Password must has 4 characters almost',
        maxlength: 'Maximun 8 characters',
      }
    }
  )
  password: string;


  @DateField(
    {
      controlName: 'birthday',
      hint: 'Enter your birthday',
      label: 'Birthday',
    }
  )
  date: Date;

  @TextAreaField(
    {
      controlName: 'address',
      label: 'Address',
      placeholder: 'Enter a complete address',
      type: {
        maxLength: 20,
      },
      validators: [
        Validators.required,
      ],
    }
  )
  addressField: string;

  @SimpleSelectField(
    {
      controlName: 'civilState',
      placeholder: 'Choose a civil state',
      label: 'Civil state',
      hint: 'Please pick a Civil State',
      validators: [
        Validators.required
      ],
      type: {
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
  )
  civilStateField: string;

  @CheckButtonField({
      controlName: 'cities',
      type: {
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
    }
  )
  citiesField: string[];

  @FileField(
    {
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
    }
  )
  profilePicture: any;

  formFields = [
    this.emaiField,
    this.password,
    this.profilePicture,
    this.civilStateField,
    this.addressField,
    this.citiesField
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  escucharDatosDelFormulario(evento) {
    if (evento) {
      console.log('todo OKi: ', evento);
    } else {
      console.log('todo mal');
    }
  }
}
