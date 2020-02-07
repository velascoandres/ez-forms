import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ChangeDetectorRef, EventEmitter, Input, Output} from '@angular/core';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {debounceTime, map, mergeMap, startWith} from 'rxjs/operators';
import {validarMinimoCheckBox} from './validadores_especiales';
import {ObjetoArchivoInterface} from '../interfaces/objeto.archivo.interface';
import {isObservable, Observable, of, Subscription} from 'rxjs';

export class FormularioPrincipal {
  sugerencias: any[] = [];
  formulario: FormGroup;
  cd: ChangeDetectorRef;
  listaObjetosArchivos = [];
  esconderArchivos = false;
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
  totalArchivos = 0;
  mensajesErrorDefecto = {
    required: 'mandatory field',
    date: 'invalid date',
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

  protected llenarFormulario() {
    const nombreControles = Object.keys(this.formulario.controls);
    nombreControles.forEach(
      (nombreControl) => {
        const datoEntrada = this.inputData[nombreControl];
        const existeDatoEntrada = datoEntrada !== undefined;
        if (existeDatoEntrada) {
          if (typeof datoEntrada !== 'object') {
            this.formulario.get(nombreControl).patchValue(datoEntrada);
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
          if (indice !== -1 && this.formConfig[indice].type.options) {
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

  llenarGaleriaMaterial(event, control) {
    const archivos = event.target.files;
    this.quitarArchivosPorControl(control.controlName);
    const objetoArchivos: File[] = Object.values(archivos);
    this.totalArchivos = objetoArchivos.length ? objetoArchivos.length : 0;
    objetoArchivos.forEach(
      (archivo: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            const formato = archivo.type;
            const objetoArchivo: ObjetoArchivoInterface = {
              propietario: control.controlName,
              datos: reader.result,
              nombreArchivo: archivo.name,
              formato,
            };
            this.listaObjetosArchivos.push(objetoArchivo);
          }
        };
        if (archivo) {
          reader.readAsDataURL(archivo);
        }
      }
    );
  }

  quitarArchivosPorControl(nombreControl: string) {
    this.listaObjetosArchivos = this.listaObjetosArchivos.filter(
      (archivo) => {
        return archivo.propietario !== nombreControl;
      }
    );
  }

  filtrarArchivosPorControl(nombreControl: string) {
    return this.listaObjetosArchivos.filter(
      (archivo) => {
        return archivo.propietario === nombreControl;
      }
    );
  }

  // Para material
  /*generearOpciones(nombreControl: string, callbackAsincrono, contexto) {
    return this.formulario.get(nombreControl).valueChanges
      .pipe(
        startWith(''),
        map(value => this.establecerOpciones(value, callbackAsincrono, contexto))
      );
    // return callbackAsincrono(this.obtenerValorDelControl(nombreControl), contexto);
  }

  obtenerValorDelControl(nombre: string): string {
    return this.formulario.get(nombre).value;
  }*/

  establecerOpciones(evento, callbackComponentePadre, reference?, esMaterial = false) {
    const parametro = evento;
    const respuesta = callbackComponentePadre(parametro, reference);
    let subscripcionOpcion;
    if (isObservable(respuesta)) {
      subscripcionOpcion = respuesta.subscribe(
        (resultados: any) => {
          this.sugerencias = resultados;
        }
      );
    } else {
      subscripcionOpcion = of(respuesta).subscribe(
        (resultados) => {
          this.sugerencias = resultados;
        }
      );
    }
    this.listaSubscripciones.push(subscripcionOpcion);
  }

  cambio(evento, nombreControl) {
    this.formulario.get(nombreControl).setValue(evento);
  }
}
