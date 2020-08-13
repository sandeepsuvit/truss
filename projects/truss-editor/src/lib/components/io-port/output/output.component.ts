import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lib-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent implements OnInit {
  @Input() name: any;
  @Input() label: any;

  constructor() { }

  ngOnInit(): void {
  }

}
