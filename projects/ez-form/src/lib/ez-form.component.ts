import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToasterConfig, ToasterService} from 'angular2-toaster';

@Component({
  selector: 'ez-form',
  templateUrl: './ez-form.component.html',
  styleUrls: ['./ez-form.component.sass'],
})
export class EzFormComponent implements OnInit {
  formulario: FormGroup;
  @Input()
  registro;
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
    this.llenarFormulario();
    this.escucharFormulario();
    this.escucharCampos();
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
        const valorDefecto = itemConfiguracion.valor;
        const validadores = [...itemConfiguracion.validadores];
        if (itemConfiguracion.tipo.nombreTipo === 'check') {
          controles[nombreControl] = new FormArray(this.agregarSubControles(itemConfiguracion.opciones), validadores);
        } else {
          controles[nombreControl] = [valorDefecto, validadores];
        }
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

  agregarSubControles(opciones: []) {
    const arregloControles = [];
    opciones.forEach(
      (opcion: any) => {
        if (opcion.seleccionado) {
          arregloControles.push(new FormControl(opcion.valor));
        }
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
    console.log('estes es el control', control.controls);
    if (( control.controls || (control.dirty || control.touched)) && control.errors) {
      arregloErrores = Object.keys(control.errors).map(
        (llave) => {
          return this.mensajesErrores[nombreCampo][llave];
        }
      );
    }
    return arregloErrores;
  }


  escucharFormulario() {
    this.formulario
      .valueChanges
      .subscribe(
        (informacionFormulario) => {
          console.log(this.formulario);
          const formularioValido = !this.formulario.invalid;
          if (formularioValido) {
            if (this.toaster) {
              this.toaster.pop(
                {
                  type: 'info',
                  title: 'Correcto',
                  body: 'Formulario valido'
                }
              );
            }
            this.datosFormulario.emit(informacionFormulario);
          } else {
            if (this.toaster) {
              this.toaster.pop(
                {
                  type: 'warning',
                  title: 'Incorrecto',
                  body: 'Formulario Invalido'
                }
              );
            }
            this.datosFormulario.emit(undefined);
          }
        }
      );
  }

  protected verificarMensajeError(nombreControl) {
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
}
