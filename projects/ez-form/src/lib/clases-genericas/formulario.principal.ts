import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ChangeDetectorRef, EventEmitter, Input, Output, Component} from '@angular/core';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {debounceTime} from 'rxjs/operators';
import {validarMinimoCheckBox} from './validadores_especiales';
import {isObservable, Observable, of, Subscription} from 'rxjs';
import {
  BaseFormField,
  CheckTypeInterface,
  AutoCompleteFieldInterface, HashMap
} from '../interfaces/controls-interfaces';
import {MetadataAutocompleteInterface} from '../interfaces/metadata-autocomplete.interface';

export class FormularioPrincipal {
  listaMetadataAutoComplete: MetadataAutocompleteInterface[] = [];
  formulario: FormGroup;
  cd: ChangeDetectorRef;
  listaObjetosArchivos = {};
  @Input()
  fullWidth = false;
  @Input()
  styleFramework = 'material';
  @Input()
  inputData = {};
  @Input()
  showToaster = true;
  @Input()
  msgErrorAnimation = 'fadeIn';
  @Input()
  toasterConfig = {
    success: {
      type: 'info',
      title: 'Correct',
      body: 'Valid Form'
    },
    fail: {
      type: 'warning',
      title: 'Incorrect',
      body: 'Invalid Form'
    }
  };
  @Input()
  formConfig: BaseFormField[] = [];

  mensajesErrores = {};
  objetoArreglosErrores = {};
  @Output()
  dataFromForm: EventEmitter<object | boolean> = new EventEmitter<object | boolean>();

  esconderTexto = true;
  totalArchivos = 0;
  mensajesErrorDefecto = {
    required: 'mandatory field',
    date: 'invalid date',
    fileExtension: 'Wrong file extension',
  };
  listaSubscripciones: Subscription[] = [];

  constructor(
    public fb: FormBuilder,
    public readonly toaster: ToasterService,
  ) {
  }

  public config: ToasterConfig = new ToasterConfig({animation: 'fade', limit: 1});


  iniciarFormulario() {
    this.construirFormulario();
    this.escucharFormulario();
    this.escucharCampos();
    // this.llenarFormulario();
  }

  protected construirFormulario() {
    const controlesFB = this.generarControles(this.formConfig);
    this.formulario = this.fb.group(
      {
        ...controlesFB
      },
    );
  }

  // protected llenarFormulario() {
  //   const nombreControles = Object.keys(this.formulario.controls);
  //   nombreControles.forEach(
  //     (nombreControl) => {
  //       const datoEntrada = this.inputData[nombreControl];
  //       const existeDatoEntrada = datoEntrada !== undefined;
  //       if (existeDatoEntrada) {
  //         if (typeof datoEntrada !== 'object') {
  //           this.formulario.get(nombreControl).patchValue(datoEntrada);
  //         }
  //       }
  //     }
  //   );
  // }

  protected generarControles(configuracion: any) {
    const controles = {};
    configuracion.forEach(
      (itemConfiguracion) => {
        const nombreControl = itemConfiguracion.controlName ? itemConfiguracion.controlName : '';
        const valorDefecto = {
          value: this.inputData[nombreControl] ? this.inputData[nombreControl] : '',
          disabled: itemConfiguracion.disabled !== undefined || itemConfiguracion.type.disabledInput !== undefined,
        };
        const tieneValidadores = itemConfiguracion.validators !== undefined;
        let validadores = [];
        if (tieneValidadores) {
          validadores = [...itemConfiguracion.validators];
        }
        if (itemConfiguracion.type.typeName === 'check') {
          const esObligatorio = itemConfiguracion.type.minRequired !== undefined && typeof +itemConfiguracion.type.minRequired === 'number';
          controles[nombreControl] = new FormArray(
            this.agregarSubControlesCheck(
              itemConfiguracion.type.options, nombreControl),
            validarMinimoCheckBox(esObligatorio ? +itemConfiguracion.type.minRequired : 0)
          );
        } else {
          controles[nombreControl] = [valorDefecto, validadores];
        }
        // controles[nombreControl]['disabled'] = desactivado;
        const tieneMensajesError = itemConfiguracion.errorMessages !== undefined;
        if (tieneMensajesError) {
          this.mensajesErrores[nombreControl] = itemConfiguracion.errorMessages;
        } else {
          this.mensajesErrores[nombreControl] = this.mensajesErrorDefecto;
        }
      }
    );
    return controles;
  }

  agregarSubControlesCheck(opciones: [], nombreControl: string) {
    const arregloControles = [];
    opciones.forEach(
      (opcion: any) => {
        arregloControles.push(new FormControl(this.inputData[nombreControl] && this.inputData[nombreControl].includes(opcion.value)));
      }
    );
    return arregloControles;
  }

  escucharCampo(nombreCampo: string) {
    const campo$ = this.formulario.get(nombreCampo);
    const subscripcionCampo = campo$
      .valueChanges
      .subscribe(
        valor => {
          this.objetoArreglosErrores[nombreCampo] = this.llenarMensajesErrorCampo(campo$, nombreCampo);
        }
      );
    this.listaSubscripciones.push(subscripcionCampo);
  }

  escucharCampos() {
    const nombreControles = Object.keys(this.formulario.controls);
    nombreControles.forEach(
      (control) => {
        this.escucharCampo(control);
      }
    );
  }

  protected llenarMensajesErrorCampo(control: AbstractControl | any, nombreCampo: string) {
    let arregloErrores = [];
    const tieneDatosPorDefecto = this.inputData !== undefined && Object.keys(this.inputData).length > 0;
    if ((control.controls || (control.dirty || control.touched) || tieneDatosPorDefecto) && control.errors) {
      arregloErrores = Object.keys(control.errors).map(
        (llave) => {
          if (llave === 'matDatepickerParse') {
            llave = 'date';
          }
          return this.mensajesErrores[nombreCampo][llave];
        }
      );
    }
    return arregloErrores;
  }

  transformarControlesConArreglosBoolean(datos) {
    const llaves = Object.keys(datos);
    llaves.map(
      (llave) => {
        if (typeof datos[llave] === 'object' && datos[llave] !== null && datos[llave].length > 0) {
          const arregloBoolean = datos[llave];
          const indice = this.formConfig.findIndex(
            (control) => {
              return control.controlName === llave;
            }
          );
          if (indice !== -1 && (this.formConfig[indice].type as CheckTypeInterface).options) {
            const arreglo = arregloBoolean.reduce(
              (acumulador, item, index) => {
                if (item && this.formConfig[indice]) {
                  acumulador.push((this.formConfig[indice].type as CheckTypeInterface).options[index].value);
                }
                return acumulador;
              }, []
            );
            if (!arreglo.length) {
              datos[llave] = '';
            } else {
              datos[llave] = arreglo;
            }
          }

        }
      }
    );
  }

  escucharFormulario() {
    const subscripcionFormulario = this.formulario
      .valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(
        (informacionFormulario) => {
          this.transformarControlesConArreglosBoolean(informacionFormulario);
          const formularioValido = !this.formulario.invalid;
          if (formularioValido) {
            if (this.showToaster) {
              this.toaster.pop(
                this.toasterConfig.success
              );
            }
            this.dataFromForm.emit(informacionFormulario);
          } else {
            if (this.showToaster) {
              this.toaster.pop(
                this.toasterConfig.fail
              );
            }
            this.dataFromForm.emit(undefined);
          }
        }
      );
    this.listaSubscripciones.push(subscripcionFormulario);
  }

  verificarMensajeError(nombreControl) {
    const tieneMensajesError = this.objetoArreglosErrores[nombreControl] && this.objetoArreglosErrores[nombreControl].length > 0;
    return tieneMensajesError;
  }

  obtenerMensajesError(nombreControl) {
    return this.objetoArreglosErrores[nombreControl];
  }

  establecerOpciones(evento, control: AutoCompleteFieldInterface) {
    const parametro = evento;
    const cb: (event: { query: string } | string, context: Component) => Observable<HashMap<any>[]> = control.type.completeMethod;
    const respuesta = cb(parametro, control.type.componentReference);
    let subscripcionOpcion;
    let metadataCampo: MetadataAutocompleteInterface = {
      propietario: control.controlName,
    };
    if (isObservable(respuesta)) {
      subscripcionOpcion = respuesta.subscribe(
        (resultados: any) => {
          metadataCampo.sugerencias = resultados;
          this.listaMetadataAutoComplete[control.controlName] = metadataCampo;
        }
      );
    } else {
      subscripcionOpcion = of(respuesta).subscribe(
        (resultados) => {
          metadataCampo.sugerencias = resultados;
          this.listaMetadataAutoComplete[`${control.controlName}`] = metadataCampo;
        }
      );
    }
    this.listaSubscripciones.push(subscripcionOpcion);
  }

  cambio(evento, nombreControl) {
    this.formulario.get(nombreControl).setValue(evento);
  }

  // Cuando se toca un campo
  determinarSiEstaValido(nombreControl: string) {
    const control = this.formulario.controls[nombreControl];
    const estaTocado = this.formulario.get(nombreControl).touched;
    const estaSucio = this.formulario.get(nombreControl).dirty;
    if (estaTocado) {
      const valor = this.formulario.get(nombreControl).value;
      const esArreglo = valor instanceof Array;
      const esListaArchivos = esArreglo && valor[0] instanceof FileList;
      // if (!esArreglo && !valor) {
      //   this.formulario.get(nombreControl).setValue(valor);
      // }
      // if (esArreglo && !esListaArchivos && !valor.length) {
      //   this.formulario.get(nombreControl).setValue('');
      // }
      if (esArreglo && esListaArchivos && !valor[0].length) {
        this.formulario.get(nombreControl).setValue('');
      }

    }
    return control.invalid && (estaSucio || estaTocado);
  }

  buscarSugerenciasPorControl(nombreControl: string): Array<any> {
    const metadata: MetadataAutocompleteInterface = this.listaMetadataAutoComplete[nombreControl];
    if (metadata) {
      return metadata.sugerencias ? metadata.sugerencias : [];
    }
    return [];
  }
}
