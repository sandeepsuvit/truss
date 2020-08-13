import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'lib-port',
  templateUrl: './port.component.html',
  styleUrls: ['./port.component.scss']
})
export class PortComponent implements OnInit {
  @Input() color = 'grey';
  @Input() name: string;

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('mousedown', ['$event'])
  handleMouseDown(event: MouseEvent | TouchEvent) {
    event.stopPropagation();
  }

}
