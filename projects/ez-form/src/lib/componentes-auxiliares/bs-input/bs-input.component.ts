import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ObjetoArchivoInterface} from '../../interfaces/objeto.archivo.interface';
import {llenarGaleria, quitarArchivoLista} from '../../clases-genericas/funciones-archivos';

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
  @Input()
  showFile = false;
  value: File[] = [];
  listaObjetosArchivos = [];
  isDisabled: boolean;
  totalArchivos = 0;
  constructor() {
  }

  onChange(value) {
    // console.log('asdasd');
  }

  onTouch() {
  }

  onInput(value) {
    this.value.pop();
    this.value.push(value);
    llenarGaleria(this, value);
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
      llenarGaleria(this, obj);
    }
  }

  obtenerArchivos() {
    return this.listaObjetosArchivos;
  }

  escucharArchivo(event) {
    this.value = quitarArchivoLista(event, this.value);
    console.log(this.value);
    llenarGaleria(this, Object.values(this.value[0]));
    this.onTouch();
    this.onChange(this.value);
  }
}
