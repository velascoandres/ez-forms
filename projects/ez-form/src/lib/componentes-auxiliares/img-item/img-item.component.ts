import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ObjetoArchivoInterface} from '../../interfaces/objeto.archivo.interface';

@Component({
  selector: 'ez-file-item',
  templateUrl: './img-item.component.html',
  styleUrls: ['./img-item.component.css']
})
export class ImgItemComponent implements OnInit {

  constructor() {
  }

  @Input()
  objetoArchivo: ObjetoArchivoInterface;
  @Output()
  archivoSalida: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
  }

  validarExtension(nombreTipo: string, extension: string): boolean {
    const tiposExtensiones = [
      {
        nombre: 'hoja-calculo',
        extensiones: [
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/vnd.ms-excel,text/comma-separated-values',
          'text/csv, application/csv',
        ]
      },
      {
        nombre: 'documento',
        extensiones: [
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/vnd.oasis.opendocument.text',
          'application/msword',
        ]
      },
      {
        nombre: 'presentacion',
        extensiones: [
          'application/vnd.ms-powerpoint',
          'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        ]
      },
      {
        nombre: 'pdf',
        extensiones: [
          'application/pdf',
        ]
      },
      {
        nombre: 'imagen',
        extensiones: [
          'image/x-png',
          'image/gif',
          'image/jpeg',
          'image/png'
        ]
      },
    ];
    const tipoEncontrado = tiposExtensiones.find(
      (tipo) => tipo.nombre === nombreTipo,
    );
    if (tipoEncontrado) {
      const perteneceExtension = tipoEncontrado.extensiones.includes(extension);
      return perteneceExtension;
    } else {
      return false;
    }
  }

  quitarArchivo() {
    this.archivoSalida.emit(
      this.objetoArchivo.nombreArchivo,
    );
  }

}
