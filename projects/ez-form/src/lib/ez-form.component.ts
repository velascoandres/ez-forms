import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {debounceTime, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {templateJitUrl} from '@angular/compiler';

@Component({
  selector: 'ez-form',
  templateUrl: './ez-form.component.html',
  styleUrls: ['./ez-form.component.sass'],
})
export class EzFormComponent implements OnInit {
  formulario: FormGroup;
  @Input()
  registro = {};
  @Input()
  mostrarToast = true;
  @Input()
  toasterConfig = {
    success: {
      type: 'info',
      title: 'Correcto',
      body: 'Formulario Válido'
    },
    fail: {
      type: 'warning',
      title: 'Incorrecto',
      body: 'Formulario Invalido'
    }
  };
  @Input()
  configuracion = [];
  mensajesErrores = {};
  objetoArreglosErrores = {};
  @Output()
  datosFormulario: EventEmitter<object | boolean> = new EventEmitter<object | boolean>();

  mensajesErrorDefecto = {
    required: 'campo obligatorio',
  };

  constructor(
    private fb: FormBuilder,
    private readonly toaster: ToasterService,
  ) {
  }

  public config: ToasterConfig =
    new ToasterConfig({animation: 'fade', limit: 1});

  ngOnInit() {
    this.construirFormulario();
    this.escucharFormulario();
    this.escucharCampos();
    // this.llenarFormulario();
  }

  protected llenarFormulario() {
    if (this.registro) {
      this.formulario.setValue(this.registro);
    }
  }

  protected construirFormulario() {
    const controlesFB = this.generarControles(this.configuracion);
    this.formulario = this.fb.group(
      {
        ...controlesFB
      },
    );
  }

  protected generarControles(configuracion: any) {
    const controles = {};
    configuracion.forEach(
      (itemConfiguracion) => {
        const nombreControl = itemConfiguracion.nombre ? itemConfiguracion.nombre : '';
        const valorDefecto = {
          value: this.registro[nombreControl] ? this.registro[nombreControl] : '',
          disabled: !!itemConfiguracion.disabled,
        };
        const tieneValidadores = itemConfiguracion.validadores !== undefined;
        let validadores = [];
        if (tieneValidadores) {
          validadores = [...itemConfiguracion.validadores];
        }
        if (itemConfiguracion.tipo.nombreTipo === 'check') {
          controles[nombreControl] = new FormArray(this.agregarSubControles(itemConfiguracion.tipo.opciones, nombreControl), validadores);
        } else {
          controles[nombreControl] = [valorDefecto, validadores];
        }
        // controles[nombreControl]['disabled'] = desactivado;
        const tieneMensajesError = itemConfiguracion.mensajesError !== undefined;
        if (tieneMensajesError) {
          this.mensajesErrores[nombreControl] = itemConfiguracion.mensajesError;
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
        arregloControles.push(new FormControl(this.registro[nombreControl] && this.registro[nombreControl].includes(opcion.valor)));
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
    if ((control.controls || (control.dirty || control.touched)) && control.errors) {
      arregloErrores = Object.keys(control.errors).map(
        (llave) => {
          return this.mensajesErrores[nombreCampo][llave];
        }
      );
    }
    return arregloErrores;
  }

  transformarBoolean(datos) {
    const llaves = Object.keys(datos);
    llaves.map(
      (llave) => {
        if (typeof datos[llave] === 'object' && datos[llave].length > 0) {
          const arregloBoolean = datos[llave];
          const indice = this.configuracion.findIndex(
            (control) => {
              return control.nombre === llave;
            }
          );
          const arreglo = arregloBoolean.reduce(
            (acumulador, item, index) => {
              if (item) {
                console.log(this.configuracion[indice]);
                acumulador.push(this.configuracion[indice].tipo.opciones[index].valor);
              }
              return acumulador;
            }, []
          );
          datos[llave] = arreglo;
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
          const formularioValido = !this.formulario.invalid;
          if (formularioValido) {
            if (this.mostrarToast) {
              this.toaster.pop(
                this.toasterConfig.success
              );
            }
            this.transformarBoolean(informacionFormulario);
            this.datosFormulario.emit(informacionFormulario);
          } else {
            if (this.mostrarToast) {
              this.toaster.pop(
                this.toasterConfig.fail
              );
            }
            this.datosFormulario.emit(undefined);
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

  updateChkbxArray(opcionCheck, estaSeleccionado, key) {
    const arregloOpcionesCheck = this.formulario.get(key) as FormArray;
    if (estaSeleccionado) {
      if (arregloOpcionesCheck.controls.findIndex(opcion => opcion.value === opcionCheck.valor) === -1) {
        arregloOpcionesCheck.push(new FormControl(opcionCheck.valor));
      }
    } else {
      const idx = arregloOpcionesCheck.controls.findIndex(x => x.value === opcionCheck.valor);
      arregloOpcionesCheck.removeAt(idx);
    }
  }

  verificarCheckRadio(valor, nombreControl) {
    if (this.registro && valor === this.registro[nombreControl]) {
      return true;
    }
    return false;
  }

  verificarChecked(valor, nombreControl) {
    if (this.registro && this.registro[nombreControl].includes(valor)) {
      return true;
    }
    return false;
  }
}
