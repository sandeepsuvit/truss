import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'lib-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {
  @ViewChild('lineRef', { static: true }) lineRefElem: ElementRef;

  @Input() id: any; // Unique identifier
  @Input() from: any;
  @Input() to: any;

  strokeWidth = 5;

  constructor() { }

  ngOnInit(): void {
  }

}
