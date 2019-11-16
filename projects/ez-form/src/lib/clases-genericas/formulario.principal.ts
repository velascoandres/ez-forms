import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {EventEmitter, Input, Output} from '@angular/core';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {debounceTime} from 'rxjs/operators';
import {validarMinimoCheckBox} from './validadores_especiales';

export class FormularioPrincipal {
  formulario: FormGroup;
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
  formConfig = [];

  mensajesErrores = {};
  objetoArreglosErrores = {};
  @Output()
  dataFromForm: EventEmitter<object | boolean> = new EventEmitter<object | boolean>();

  esconderTexto = true;
  mensajesErrorDefecto = {
    required: 'mandatory field',
    date: 'invalid date',
  };

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
    this.llenarFormulario();
  }

  protected construirFormulario() {
    const controlesFB = this.generarControles(this.formConfig);
    this.formulario = this.fb.group(
      {
        ...controlesFB
      },
    );
  }

  protected llenarFormulario() {
    const nombreControles = Object.keys(this.formulario.controls);
    nombreControles.forEach(
      (nombreControl) => {
        const datoEntrada = this.inputData[nombreControl];
        const existeDatoEntrada = datoEntrada !== undefined;
        if (existeDatoEntrada) {
          if (typeof datoEntrada !== 'object') {
            this.formulario.get(nombreControl).patchValue(datoEntrada);
          } else {
            this.formulario.get(nombreControl).setValue([]);
          }
        }
      }
    );
  }

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
            this.agregarSubControles(
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

  agregarSubControles(opciones: [], nombreControl: string) {
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
    campo$
      .valueChanges
      .subscribe(
        valor => {
          this.objetoArreglosErrores[nombreCampo] = this.llenarMensajesErrorCampo(campo$, nombreCampo);
        }
      );
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
        if (typeof datos[llave] === 'object' && datos[llave].length > 0) {
          const arregloBoolean = datos[llave];
          const indice = this.formConfig.findIndex(
            (control) => {
              return control.controlName === llave;
            }
          );
          const arreglo = arregloBoolean.reduce(
            (acumulador, item, index) => {
              if (item && this.formConfig[indice]) {
                acumulador.push(this.formConfig[indice].type.options[index].value);
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
    );
  }

  escucharFormulario() {
    this.formulario
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
  }

  verificarMensajeError(nombreControl) {
    const tieneMensajesError = this.objetoArreglosErrores[nombreControl] && this.objetoArreglosErrores[nombreControl].length > 0;
    return tieneMensajesError;
  }

  obtenerMensajesError(nombreControl) {
    return this.objetoArreglosErrores[nombreControl];
  }
}
