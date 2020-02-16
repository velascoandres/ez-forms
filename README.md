# ez-form  
## Index  
1. [Description](#description)  
2. [Requirements](#requirements)
3. [Install](#install)  
4. [Usage](#usage)
     
     4.1  [Files](#file)
     
     4.2  [Multiple files](#multiple-files)
     
     4.3  [Autocomplete](#autocomplete)
     
     4.4  [Toaster](#toaster)  
     
     4.5  [Bootstrap](#bootstrap)
     
     4.6  [Animations](#animations)
5. [Summary](#summary)     
  
## Description  
`ez-form` is a componente that allows create reactive forms for angular 2+. 

``This library makes use of angular material, bootstrap and PrimeNG libraries and 
components ``
 
## Requirements
* Bootstrap
```shell script
 $ npm i bootstrap
```

* PRIMENG:   Check [Documentation](https://www.primefaces.org/primeng/#/setup)
* chart.j: Check [Documentation](https://www.npmjs.com/package/chart.js) 
   ```shell script
     $ npm i chart.js
    ```
* Quill: Check [Documentation](https://www.npmjs.com/package/quill)
    ```shell script
      $ npm i quill
     ```
  
* Angular Material: Check [Documentation](https://material.angular.io/)
```text
    $ ng add @angular/material
```
* Angular 2 Toaster: Check [Documentation](https://www.npmjs.com/package/angular2-toaster)

* ngx-material-file-input: Check [Documentation](https://www.npmjs.com/package/ngx-material-file-input)
  
  
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

For example: we need to create a form with the following fields:
* UUID: `Disabled` input (Optional)
```typescript
      {
        controlName: 'uuid',
        type: {
          typeName: 'input'
        },
        disabled: true,
      },
```
* Password: `Password` input (Required)
```typescript
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
```
* Brithday: `Date` input (Required)
```typescript
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
```
* Address: `Long text` input (Required)
```typescript
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
```
* Email: `Text` input (Required, Email Validation)
```typescript
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
```
* Civil State: `Select` input (Required)
```typescript
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
```
* Cities: `Multiple Select` input  (Required, minimum 2)
```typescript
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
```
* Favorite Fruit: `Radio Button` input  (Required)
```typescript
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
```
* Profile Picture: `File` input (Accept images only)
```typescript
    {
          controlName: 'profilePicture',
          label: 'Profile Picture',
          hint: 'Please upload your profile picture',
          placeholder: 'Add your profile picture',
          type: {
            typeName: 'file',
            multiple: false,
            accept: 'image/*',
          },
        }
```

* Favorite Files: `File` input (Multiple)
  * Validators: Required, minSize, maxSize, file extension.
```typescript
{
      controlName: 'someFiles',
      label: 'Add Some Files',
      hint: 'Please upload your files',
      placeholder: 'Add Files',
      validators: [
        Validators.required,
        FileValidator.extensions(['png']),
        FileValidator.minSize(100),
        FileValidator.maxSize(500),
      ],
      errorMessages: {
        required: 'Mandatory File',
        fileExtension: 'Please select png files only',
        fileMinSize: 'File size must be above of 100 kilobytes',
        fileMaxSize: 'File size is larger than 500 kilobytes'
      }
      type: {
        typeName: 'file',
        multiple: true,
        accept: '*/*',
        showFile: true,
        tableHeaders: { // Optional
          actions: 'Operations',
          description: 'Entry Files'
        }
      }
    }
```
All fields must be at a config array like this in our parent component, for example: 

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
       .... you could add more fields as you wish  ... 
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

## File
For angular material this library makes use of [ngx-material-file-input](https://www.npmjs.com/package/ngx-material-file-input)
Demonstration from the configuration example
![fileinput](https://github.com/velascoandrs/repo-de-imagenes/blob/master/archivos/single-file.PNG?raw=true)

## Multiple Files
![files](https://github.com/velascoandrs/repo-de-imagenes/blob/master/archivos/multiple-files.PNG?raw=true)


## Autocomplete

Parent component typescript code:

```typescript
    {
          controlName: 'city',
          validators: [
            Validators.required
          ],
          label: 'City',
          placeholder: 'Example: Barcelona',
          type: {
            typeName: 'autocomplete',
            maxLength: 30,
            completeMethod: this.filterCityWithHttpService,
            nameAutoComplete: 'name', // object attribute that will be displayed in the component
            componentReference: this
          },
          errorMessages: {
            required: 'The city is mandatory',
          },
          hint: 'Search a city'
    }

    filterCityWithHttpService(event, context) {
        return context._cityService.find(event.query ? event.query : event);
    }
```
### About filter method
```text
    The filter service methond must return an observable. If you need format the data from the API, 
    you should use the `pipe` operator.
```
The `find` method code in wikipedia service:
```typescript
    find(query: string): Observable<any> {
        const url = `${this.url}&srsearch=${query}`;
        return this._httpClient.get(url)
        .pipe(
          mergeMap(
            (response: any) => {
              if (response.query) {
                return of(response.query.search);
              }
              return of([]);
            }
          )
        );
      }
```

### Results
* Material

![autocomplete-material](https://github.com/velascoandrs/repo-de-imagenes/blob/master/autocomplete/material.PNG?raw=true)

* PRIMENG
```text
I put the PRIMENG autocomplete into bootstrap mode since the boostrap framework does not have an autocomplete component.

```
![autocomplete-primeng](https://github.com/velascoandrs/repo-de-imagenes/blob/master/autocomplete/primeng.PNG?raw=true)

## Toaster
This library makes use of [angular2-toaster](https://www.npmjs.com/package/angular2-toaster)
* The toaster is the message which shows on screen when the form has been filled correctly or incorrectly.
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
Use the input : `toasterConfig`"


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

## Results

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
| fullWidth | Input | Full width of each form fields | OPTIONAL

### Control Object
|Attribute  | Description | Required |
| --- | ---| --- |
| controlName | Form Control name | YES
| placeholder | Describes the expected value of an input field  | OPTIONAL
| hint | Hint displayed in the input field before the user enters a value | OPTIONAL
| label | Hint displayed in the input field before the user enters a value | OPTIONAL
| type | Input type object: select, input, file, check.. | YES
| validators | Array with angular form validators, it doesn't work with check type | OPTIONAL

### Type Attribute Object


|Attribute | Description |
| --- | ---|
| input | Input field for text and numbers |
| typename | type name: input, select, radio, check, textarea, date, file |
| class | Uniquely for input type. Defines the character type for example a `password` field
| options | Uniquely for select, radio, check
| minRequired | Uniquely for check. Defines how many checks fields are mandatory
| maxLength | Uniquely for input, textarea and date. Defines how many characters are allowed
| showFile | Uniquely for file. Default `false`. Show file or files preview.


### Example Full Code
If you are looking for a full example of this library please check the following [github repository](https://github.com/velascoandrs/ez-form-example)


### Especial Thanks

* [Angular Material](https://material.angular.io/)
* [PrimeNG](https://primefaces.org/primeng/#/)
* [Bootstrap](https://getbootstrap.com/)
* [ngx-material-file-input](https://www.npmjs.com/package/ngx-material-file-input)
* [Animate.css](https://daneden.github.io/animate.css/)
* [angular2-toaster](https://www.npmjs.com/package/angular2-toaster)
* [Pexels](https://www.pexels.com/)
* [chart.js](https://www.chartjs.org/) 
* [Quill](https://quilljs.com/)
