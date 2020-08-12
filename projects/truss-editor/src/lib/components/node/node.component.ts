import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TrussContextService } from '../../services/truss-context.service';

@Component({
  selector: 'lib-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {
  @Input() id: any; // Unique identifier
  // Reference for the workspace
  @Input() workspaceDimensions: DOMRect;

  // Node based properties
  @Input() width: number;
  @Input() height: number;
  @Input() x: number;
  @Input() y: number;
  @Input() delay = 6;
  @Input() type: any;

  label: string;

  // Events
  @Output() onDrag = new EventEmitter<any>();
  @Output() onDragEnd = new EventEmitter<any>();

  constructor(
    private trussContext: TrussContextService,
  ) { }

  ngOnInit(): void {
    const { nodeTypes, inputTypes } = this.trussContext;

    // Initialize the node
    this.initNode(nodeTypes);
  }

  /**
   * Initialize the node context
   *
   * @param {*} nodeTypes
   * @memberof NodeComponent
   */
  initNode(nodeTypes: any) {
    const { label, inputs = [], outputs = [] } = nodeTypes[this.type];
    this.label = label;
  }

}
