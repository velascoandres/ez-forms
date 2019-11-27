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

}
