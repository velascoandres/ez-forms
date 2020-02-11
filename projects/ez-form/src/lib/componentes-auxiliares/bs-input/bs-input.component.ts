import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
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
  @Input()
  hint = '';
  @Input()
  tableHeaders = {actions: '', description: ''};
  value: File[] = [];
  listaObjetosArchivos = [];
  isDisabled: boolean;
  constructor() {
  }

  onChange(value) {
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
  escucharArchivo(event) {
    this.value = quitarArchivoLista(event, this.value);
    llenarGaleria(this, Object.values(this.value[0]));
    this.onTouch();
    this.onChange(this.value);
  }
}
