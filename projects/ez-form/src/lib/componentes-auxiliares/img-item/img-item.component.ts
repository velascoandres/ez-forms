import {Component, Input, OnInit} from '@angular/core';
import {ObjetoArchivoInterface} from '../../interfaces/objeto.archivo.interface';

@Component({
  selector: 'ez-file-item',
  templateUrl: './img-item.component.html',
  styleUrls: ['./img-item.component.css']
})
export class ImgItemComponent implements OnInit {

  constructor() { }
  @Input()
  objetoArchivo: ObjetoArchivoInterface;
  ngOnInit() {
  }
  validarExtension(nombreTipo: string, extension: string): boolean {
    console.log(extension);
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
      console.log(tipoEncontrado);
      const perteneceExtension = tipoEncontrado.extensiones.includes(extension);
      console.log(perteneceExtension);
      return perteneceExtension;
    } else {
      return false;
    }
  }

}
