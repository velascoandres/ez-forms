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
  @Input()
  header = {actions: '', description: ''};

  ngOnInit() {
    if (!this.header) {
      this.header = {actions: 'Actions', description: ''};
    }
    this.cols = [
      {field: 'nombreArchivo', header: this.header.description ? this.header.description : this.label},
      {field: 'nombreArchivo', header: this.header.actions ? this.header.actions : 'Actions' },
    ];
  }

  emitirArchivo(nombreArchivo: string) {
    this.archivoSalida.emit(nombreArchivo);
  }

}
