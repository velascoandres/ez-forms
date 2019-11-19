# ez-form  
## Index  
1. [Description](#description)  
2. [Requirements](#requirements)
3. [Install](#install)  
4. [Usage](#usage)

     4.1  [Toaster](#toaster)  
     
     4.2  [Bootstrap](#bootstrap)
     
     4.3  [Animations](#animations)
5. [Summary](#summary)     
  
## Description  
`ez-form` is a componente that allows create reactive forms for angular 2+.  
 
## Requirements
* Angular Material check [Documentation](https://material.angular.io/)
```text
    $ ng add @angular/material
```
* Angular 2 Toaster check [Documentation](https://www.npmjs.com/package/angular2-toaster)
  
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
        hint: 'Enter a valid date',
        type: {
          typeName: 'date'
        },
        validators: [
          Validators.required,
        ]
      },
      {
        controlName: 'address',
        placeholder: 'Enter a complete address',
        type: {
          typeName: 'textarea',
          maxLength: 20,
        },
        validators: [
          Validators.required,
        ],
      },
      {
        controlName: 'email',
        validators: [
          Validators.required,
          Validators.email
        ],
        placeholder: 'Enter an email',
        type: {
          typeName: 'input',
          maxLength: 30,
        },
        errorMessages: {
          required: 'The email is mandatory',
          email: 'You must enter a valid email',
        },
        hint: 'Enter a valid email'
      },
      {
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
      },
      {
        controlName: 'cities',
        type: {
          typeName: 'check',
          minRequired : 2,
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

## Summary
#### Component

|Attribute  | Type | Description | Required |
| --- | --- | ---| --- |
| formConfig | Input | Form config object | YES |
| inputData | Input | Form default values object | OPTIONAL
| dataFromForm | OutPut | Data returned from form | YES
| styleFramework | Input | Form style | OPTIONAL
| msgErrorAnimation | Input | Error message animation | OPTIONAL
| toasterConfig | Input | Toaster message configuration object | OPTIONAL
| showToaster | Input | Show Toaster message | OPTIONAL

### Control Object
|Attribute  | Description | Required |
| --- | ---| --- |
| controlName | Form Control name | YES
| placeholder | Describes the expected value of an input field  | OPTIONAL
| hint | Hint displayed in the input field before the user enters a value | OPTIONAL
| label | Hint displayed in the input field before the user enters a value | OPTIONAL
| type | Input type object: select, input.. | YES
| validators | Array with angular form validators, it doesn't work with check type | OPTIONAL

### Type Attribute Object: 'input'


|Attribute | Description |
| --- | ---|
| input | Input field for text and numbers |
| typename | type name: input, select, radio, check, textarea, date |
| class | Uniquely for input type. Defines the character type for example a `password` field
| options | Uniquely for select, radio, check
| minRequired | Uniquely for check. Defines how many checks fields are mandatory
| maxLength | Uniquely for input, textarea and date. Defines how many characters are allowed


### Example Full Code
If you are looking for a full example of this library please check the following [github repository](https://github.com/velascoandrs/ez-form-example)
