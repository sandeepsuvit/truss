import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lib-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {
  @Input() type: any;
  @Input() label: any;
  @Input() options = [];
  @Input() placeholder: any;

  constructor() { }

  ngOnInit(): void {
  }

  getControlByType(type: string) {
    switch (type) {
      case 'select':
        return `Select control`;

      default:
        return `Default control`;
    }
  }

}
