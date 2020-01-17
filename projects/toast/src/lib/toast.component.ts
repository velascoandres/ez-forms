import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ez-toast',
  templateUrl: './ez-toast.component.html',
  styleUrls: ['./ez-toast.component.sass'],
})
export class ToastComponent implements OnInit {
  @Input()
  title: string;
  @Input()
  body: string;
  @Input()
  type: string;
  constructor() { }

  ngOnInit() {
  }

}
