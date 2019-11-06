# ez-form  
## Indice  
1. [Descripción](#descripción)  
2. [Instalación](#instalación)  
3. [Uso](#uso)  
4. [Detalles](#detalles)  
  
## Descripción  
`ez-form` es un componente que permite crear formularios reactivos de manera fácil "ez".  
  
## Instalación  
* Instalamos el paquete:   
  
```shell script  
    $ npm i @gordon_freeman/ez-form  
```  
  
* Importamos `EzFormModule` en el modulo en donde queremos usar el componente.  
  
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
  
* Usamos el componente.  
  
```html  
    <ez-form [configuracion]="miConfiguracion">  
            <button>Submit</button>  
     </ez-form>  
```  
## Uso  
Antes que nada primero necesitamos declarar un objeto de configuración   
dentro del componente padre.  
  
### `componentePadre.ts`  
```typescript  
      controles = [  
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
          nombre: 'estadoCivil',  
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
            opciones: [{valor: 3, nombre: 'Quito'}, {valor: 1, nombre: 'Cuenca'}, {nombre: 'Ambato', valor: 2}]},  
          label: 'Ciudades',  
          mensajesError: {  
            required: 'Eliga por lo menos una ciudad',  
          }  
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
  
```  
  
Entonces en nuesto `componentePadre.html` llamamos al componente.  
  
```html  
    <ez-form [configuracion]="miConfiguracion">  
         <button (click)="algunaFuncionClic()">Submit</button>  
     </ez-form>  
```  
  
Si queremos que nuestro formulario este lleno desde un diccionario entonces hacemos lo siguiente:  
  
Diccionario:   
  
```typescript  
    usuario = {    
       email: 'juan.pecadoss@correo.com',    
       estadoCivil: 1,    
       frutaFavorita: 1,    
       ciudades: [1, 3]    
   };  
```  
  
Componente `componentePadre.html`:  
  
```html  
    <ez-form   
            [configuracion]="miConfiguracion"  
            [registro]="usuario"  
            >  
         <button (click)="algunaFuncionClic()">Submit</button>  
     </ez-form>  
```  
  
El formulario tiene un  `Output` donde devolvera los datos del formulario o un `undefined` dependiendo  
si el formulario haya sido llenado correctamente.  
  
  
```html  
    <ez-form   
            [configuracion]="miConfiguracion"  
            [registro]="usuario"  
            (datosFormulario)="algunaFuncion($event)"  
            >  
         <button (click)="algunaFuncionClic()">Submit</button>  
     </ez-form>  
```  
Resultados:   
  
![formulario](https://raw.githubusercontent.com/velascoandrs/repo-de-imagenes/master/formulario.PNG)  
  
## Toaster
El toaster es el mensaje que se muestra en pantalla cuando el formulario es válido o no. 
El despligue de estos mensaje puede ser opcional
```html  
    <ez-form   
            [configuracion]="miConfiguracion"  
            [registro]="usuario"  
            (datosFormulario)="algunaFuncion($event)" 
            [mostrarToast]="false" 
            >  
         <button (click)="algunaFuncionClic()">Submit</button>  
     </ez-form>  
```
Tambien podemos configurar los mensajes que se mostraran de la siguiente forma:
```typescript
    const myToasterConfig = {
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
```    

```html  
    <ez-form   
            [configuracion]="miConfiguracion"  
            [registro]="usuario"  
            (datosFormulario)="algunaFuncion($event)" 
            [toasterConfig]="myToasterConfig"
            >  
         <button (click)="algunaFuncionClic()">Submit</button>  
     </ez-form>  
```
Resultados: 
## Detalles  
  
### Sobre el objeto de configuración:  
  
Es un arreglo en donde cada elemento corresponde a un campo del formulario, este campo tiene la siguiente configuracion:  
* nombre: Es el nombre de nuestro control `formControlName`.  
* label: Es el texto que tendra el label del campo, es `opcional`.  
* validadores: Recibe un arreglo con las validaciones que tendra el campo, es `opcional`.  
* placeholder: Es el placeholder de nuestro campo. es `opcional`.  
* tipo: Es un objeto en donde especificamos el tipo de campo que será. Se lo declara de la siguiente forma:  
  * nombre: Nombre del tipo (input, select, radio, check).  
  * opciones: Solo para select, radio, check. Es un arreglo con las opciones que tendrán estos campos tienen el siguiente formato:  
      * valor: Valor que recibira el campo internamente.  
      * nombre: Valor que se mostrara en pantalla.  
       
  
### Nota  
> `ez-form` usa los componentes de Angular Material unicamente. En las siguientes versiones se incorporarán los componentes tanto para Bootstrap y PrimeNg.
