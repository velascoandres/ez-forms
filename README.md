# ez-form  
## Index  
1. [Description](#description)  
2. [Requirements](#requirements)
3. [Install](#install)  
4. [Usage](#usage)

     4.1  [Toaster](#toaster)  
     
     4.2  [Bootstrap](#bootstrap)
     
     4.3  [Animations](#animations)
     
  
## Description  
`ez-form` is a componente that allows create reactive forms for angular 2+.  
 
## Requirements
* Angular Material see: [Documentation](https://material.angular.io/)
```text
    $ ng add @angular/material
```
* Angular 2 Toaster see: [Docuemntation](https://www.npmjs.com/package/angular2-toaster)
  
## Install  
* Install the package:   
  
```shell script  
    $ npm i @gordon_freeman/ez-form  
```  
  
* Import `EzFormModule`
  
```typescript  
    @NgModule({  
      declarations: [  
        AppComponent  
      ],  
      imports: [  
        BrowserModule,  
        EzFormModule,  
        BrowserAnimationsModule,  
      ],  
      providers: [],  
      bootstrap: [AppComponent]  
    })  
```  
  
If you want use  `datepicker` from angular material:

```typescript
    @NgModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        EzFormModule,
        BrowserAnimationsModule,
        MatNativeDateModule,
      ],
      providers: [
        MatDatepickerModule,
      ],
      bootstrap: [AppComponent]
    })
```

## Usage  
First we need a config object inside of parent component.
  
### `parentComponent.ts`  
```typescript  
  myConfiguration = [
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

```  
  
So in our `parentComponent.html` call the component.

  
```html  
    <ez-form
            [formConfig]="myConfiguration"
          >
          <button [disabled]="!usuario" class="btn btn-block btn-info">Submit</button>
    </ez-form>
```  
  
  
If we want our form to be filled with default values. We need to declare a object with the controls name as keys example:  

```typescript  
    userData = {
        uuid: 1234,
        email: 'juan.pecados@mail.com',
        civilState: 1,
        otherDate: '2015-02-16',
        birthday: '1999-02-16',
        favoriteFruit: 1,
        cities: [1, 3],
        password: '12133',
      };
```  
  
Template `parentComponent.html`:  

  
```html  
    <ez-form
            [formConfig]="myConfiguration"
            [inputData]="userData"
          >
          <button [disabled]="!usuario" class="btn btn-block btn-info">Submit</button>
    </ez-form>
```  
  

The form has an `Output` where you will return the form data or an` undefined` depending
If the form has been filled out correctly.

So we need to make use of the Output : `dataFromForm`"
    
```html  
    <ez-form   
            [formConfig]="myConfiguration"  
            [inputData]="userData"  
            (dataFromForm)="someFunction($event)"  
            >  
         <button (click)="someFunction()">Submit</button>  
     </ez-form>  
```  
Results:   
  
![formulario](https://github.com/velascoandrs/repo-de-imagenes/blob/master/version-en/form-valid-mat.PNG?raw=true)  


## Toaster
This library make use of [angular2-toaster](https://www.npmjs.com/package/angular2-toaster)
* The toaster is the message which shows on screen when the form has been filled correctly or not.
* The display of this messages could be optional

We need to make use of the following Input : `showToaster`"


```html
<ez-form
        [formConfig]="myConfiguration"
        [inputData]="userData"
        [showToaster]="false"
      > ... 
```
Also we could config the messages that will show on the toaster:
```typescript
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
```    
Usamos el Input : `toasterConfig`"


```html  
    <ez-form
            [formConfig]="myConfiguration"
            [inputData]="userData"
            [toasterConfig]="myToasterConfig"
          >...
```
Results: 

![formulario](https://github.com/velascoandrs/repo-de-imagenes/blob/master/version-en/form-invalid-mat-ctoat.PNG?raw=true)

### Bootstrap
By Deault the ez-form component loads its internal components from `Angular Material`.
* If you want make use of bootstrap components:

Use the Input : `styleFramework`"

```html
    <ez-form
            [formConfig]="myConfiguration"
            [inputData]="userData"
            [styleFramework]="'material'"
          >..
```

Resultados
![resultadoBootstrap](https://github.com/velascoandrs/repo-de-imagenes/blob/master/version-en/form-invalid-bs.PNG?raw=true)

### Animations
The error messages animations for every form field could be modify, so we need to make use of [animate.css
](https://www.npmjs.com/package/animate.css?activeTab=versions). 

Use the Input : `msgErrorAnimation`:

```html
<ez-form
        [formConfig]="myConfiguration"
        [inputData]="userData"
        [msgErrorAnimation]="'fadeInLeft'"
      >
```

Complete example form component:
```html
    <ez-form
            [formConfig]="myConfiguration"
            [inputData]="userData"
            (dataFromForm)="someFunction($event)"
            [styleFramework]="'material'"
            [msgErrorAnimation]="'fadeInLeft'"
            [toasterConfig]="myToasterConfig"
          >
            <button [disabled]="!userData" class="btn btn-block btn-info">Submit</button>
          </ez-form>
```
