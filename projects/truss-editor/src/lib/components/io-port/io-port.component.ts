import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lib-io-port',
  templateUrl: './io-port.component.html',
  styleUrls: ['./io-port.component.scss']
})
export class IoPortComponent implements OnInit {
  @Input() inputs = [];
  @Input() outputs = [];
  @Input() nodeId: any;

  constructor() { }

  ngOnInit(): void {
    // console.log(this.outputs);
  }

}
