import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'ez-bs-input',
  templateUrl: './bs-input.component.html',
  styleUrls: ['./bs-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BsInputComponent),
      multi: true
    }
  ]
})
export class BsInputComponent implements OnInit, ControlValueAccessor {
  @Input()
  controlName = '';
  @Input()
  placeholder = '';
  @Input()
  label = '';
  @Input()
  multiple = false;
  @Input()
  accept = '';
  value: File[] = [];
  listaObjetosArchivos = [];
  isDisabled: boolean;
  esconderArchivos = true;

  constructor() {
  }

  onChange = (_) => {
    console.log('asdasd');
  };
  onTouch = () => {
  };

  onInput(value) {
    this.value.pop();
    this.value.push(value);
    this.llenarGaleria(value);
    this.onTouch();
    this.onChange(this.value);
  }

  ngOnInit() {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(obj: any): void {
    if (obj) {
      this.value.pop();
      this.value.push(obj);
      this.llenarGaleria(obj);
    }
  }

  llenarGaleria(event) {
    const objetoArchivos: File[] = Object.values(event);
    this.listaObjetosArchivos = [];
    objetoArchivos.forEach(
      (archivo: File) => {
        console.log(archivo);
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            const formatoAcceptado = this.accept;
            if (formatoAcceptado && archivo.type.match(formatoAcceptado)) {
              const objetoArchivo = {
                propietario: this.controlName,
                datos: reader.result,
              };
              this.listaObjetosArchivos.push(objetoArchivo);
              this.esconderArchivos = false;
            } else {
              this.esconderArchivos = true;
            }
          }
        };
        if (archivo) {
          reader.readAsDataURL(archivo);
        }
      }
    );
  }

  obtenerArchivos() {
    return this.listaObjetosArchivos;
  }
}
