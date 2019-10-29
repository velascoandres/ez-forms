import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {ToasterConfig, ToasterService} from 'angular2-toaster';

@Component({
  selector: 'ez-form',
  templateUrl: './ez-form.component.html',
  styleUrls: ['./ez-form.component.sass'],
})
export class EzFormComponent implements OnInit {
  formulario: FormGroup;
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
    console.log(this.mensajesErrores);
  }

  protected construirFormulario() {
    const controlesFB = this.generarControles(this.configuracion);
    this.formulario = this.fb.group(
      controlesFB,
    );
  }

  protected generarControles(configuracion: any) {
    const controles = {};
    configuracion.forEach(
      (itemConfiguracion) => {
        const nombreControl = itemConfiguracion.nombre ? itemConfiguracion.nombre : '';
        const valorDefecto = itemConfiguracion.valor;
        const validadores = [...itemConfiguracion.validadores];
        controles[nombreControl] = [valorDefecto, validadores];
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

  protected llenarMensajesErrorCampo(control: AbstractControl, nombreCampo: string) {
    let arregloErrores = [];
    if ((control.dirty || control.touched) && control.errors) {
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
}
