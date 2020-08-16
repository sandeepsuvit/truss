import { Component, Input, OnInit } from '@angular/core';
import { TrussContextService } from '../../../services/truss-context.service';

@Component({
  selector: 'lib-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() name: any;
  @Input() label: any;
  @Input() type: any;
  @Input() nodeId: any;

  defaultLabel = 'Not applicable';
  color: string;
  controls = [];

  constructor(
    private context: TrussContextService,
  ) { }

  ngOnInit(): void {
    const { label: defaultLabel, color, controls = [] } = this.context.inputTypes[this.type] || {};
    this.color = color;
    this.controls = controls;
  }

}
