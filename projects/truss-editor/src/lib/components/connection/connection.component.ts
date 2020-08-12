import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lib-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {
  @Input() id: any; // Unique identifier
  @Input() from: any;
  @Input() to: any;

  constructor() { }

  ngOnInit(): void {
  }

}
