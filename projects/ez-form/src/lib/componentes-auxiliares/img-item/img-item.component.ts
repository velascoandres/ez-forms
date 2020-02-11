import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ObjetoArchivoInterface} from '../../interfaces/objeto.archivo.interface';

@Component({
  selector: 'ez-file-items',
  templateUrl: './img-item.component.html',
  styleUrls: ['./img-item.component.css']
})
export class ImgItemComponent implements OnInit {
  constructor() {
  }

  @Input()
  objetosArchivos: ObjetoArchivoInterface[];
  @Output()
  archivoSalida: EventEmitter<string> = new EventEmitter<string>();
  cols: any[];
  @Input()
  label;
  @Input()
  controlName;

  ngOnInit() {

    this.cols = [
      {field: 'nombreArchivo', header: this.label ? this.label : this.controlName},
      {field: 'nombreArchivo', header: 'Actions'},
    ];
  }
  emitirArchivo(nombreArchivo: string) {
    this.archivoSalida.emit(nombreArchivo);
  }

}
