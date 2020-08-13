import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ICoordinates } from '../../interfaces/coordinates.interface';
import { TrussContextService } from '../../services/truss-context.service';
import { getPortRect } from '../../utils/connection-calculator.util';

@Component({
  selector: 'lib-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {
  @ViewChild('nodeWrapper') nodeWrapper: ElementRef;

  @Input() id: any; // Unique identifier
  // Reference for the workspace
  @Input() workspaceRect: DOMRect;

  // Node based properties
  @Input() width: number;
  @Input() height: number;
  @Input() x: number;
  @Input() y: number;
  @Input() delay = 6;
  @Input() connections: any;
  @Input() type: any;

  // Custom properties
  label: string;
  inputs = [];
  outputs = [];
  offset: any;
  coordinates: ICoordinates = null;
  startCoordinates: ICoordinates = null;
  isDragging = false;

  constructor(
    private trussContext: TrussContextService,
  ) { }

  ngOnInit(): void {
    const { nodeTypes, inputTypes } = this.trussContext;

    // Initialize the coordinates on load
    this.startCoordinates = this.coordinates = { x: this.x, y: this.y };

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
    this.inputs = inputs;
    this.outputs = outputs;
  }

  /**
   * Update connection line when node is moved
   *
   * @private
   * @memberof NodeComponent
   */
  private updateConnectionsByTransput(transput: any, isOutput: boolean = false){
    if (!transput) { return; }

    Object.entries(transput).forEach(([portName, outputs]) => {
      (outputs as any[]).forEach((output: any) => {
        const toRect = getPortRect(this.id, portName);
        const fromRect = getPortRect(output.nodeId, output.portName);
        const portHalf = fromRect.width / 2;
        let combined: string;

        if (isOutput) {
          combined = `${this.id}${portName}${output.nodeId}${output.portName}`;
        } else {
          combined = `${output.nodeId}${output.portName}${this.id}${portName}`;
        }

        const cnt: SVGLineElement = document.querySelector(`[data-connection-id="${combined}"]`);

        cnt.x1.baseVal.value = toRect.x - this.workspaceRect.x + portHalf;
        cnt.y1.baseVal.value = toRect.y - this.workspaceRect.y + portHalf;
        cnt.x2.baseVal.value = fromRect.x - this.workspaceRect.x + portHalf;
        cnt.y2.baseVal.value = fromRect.y - this.workspaceRect.y + portHalf;
      });
    });
  }

  /**
   * Update the node connections when node is moved
   *
   * @private
   * @memberof NodeComponent
   */
  private updateNodeConnections() {
    if (this.connections) {
      this.updateConnectionsByTransput(this.connections.inputs);
      this.updateConnectionsByTransput(this.connections.outputs, true);
    }
  }

  /**
   * Update the coordinates of the element after drag
   *
   * @private
   * @memberof NodeComponent
   */
  private updateCoordinates = (event: any) => {
    this.coordinates = {
      x: event.clientX - this.workspaceRect.left - this.offset.x,
      y: event.clientY - this.workspaceRect.top - this.offset.y,
    };

    this.updateNodeConnections();
  }

  /**
   * Stop dragging
   *
   * @private
   * @memberof NodeComponent
   */
  private stopDrag = (event: any) => {
    this.coordinates = {
      x: event.clientX - this.workspaceRect.left - this.offset.x,
      y: event.clientY - this.workspaceRect.top - this.offset.y,
    };

    this.isDragging = false;
    window.removeEventListener('mouseup', this.stopDrag);
    window.removeEventListener('mousemove', this.updateCoordinates);
  }

  /**
   * Start dragging the element
   *
   * @private
   * @memberof NodeComponent
   */
  private startDragging = (event: MouseEvent | TouchEvent) => {
    const nodeRect = this.nodeWrapper.nativeElement.getBoundingClientRect();
    this.offset = {
      x: this.startCoordinates.x - nodeRect.left,
      y: this.startCoordinates.y - nodeRect.top
    };

    this.updateCoordinates(event);
    this.isDragging = true;

    // Register event listeners
    window.addEventListener('mouseup', this.stopDrag);
    window.addEventListener('mousemove', this.updateCoordinates);
  }

  /**
   * Listen to the drag event
   *
   * @private
   * @memberof NodeComponent
   */
  private listenToDragEvent = (event: MouseEvent | TouchEvent) => {
    let x: number;
    let y: number;

    if (event instanceof TouchEvent && 'ontouchstart' in window) {
      x = event.touches[0].clientX;
      y = event.touches[0].clientY;
    } else {
      event.preventDefault();
      x = (event as MouseEvent).clientX;
      y = (event as MouseEvent).clientY;
    }

    const a = Math.abs(this.startCoordinates.x - x);
    const b = Math.abs(this.startCoordinates.y - y);
    const distance = Math.round(Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)));
    const dragDistance = this.delay;

    if (distance >= dragDistance) {
      this.startDragging(event);
      this.stopDragDelay();
    }
  }

  /**
   * Stop the drag event
   *
   * @private
   * @memberof NodeComponent
   */
  private stopDragDelay = () => {
    document.removeEventListener('mouseup', this.stopDragDelay);
    document.removeEventListener('mousemove', this.listenToDragEvent);

    // Reset the coordinates
    this.startCoordinates = null;
  }

  /**
   * Hook onto the dragging event
   *
   * @param {(MouseEvent | TouchEvent)} event
   * @memberof NodeComponent
   */
  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  startDragDelay(event: MouseEvent | TouchEvent) {
    let x: number;
    let y: number;

    if (event instanceof TouchEvent && 'ontouchstart' in window) {
      x = event.touches[0].clientX;
      y = event.touches[0].clientY;
    } else {
      event.preventDefault();
      x = (event as MouseEvent).clientX;
      y = (event as MouseEvent).clientY;
    }

    this.startCoordinates = { x, y };

    // Register event listeners
    document.addEventListener('mouseup', this.stopDragDelay);
    document.addEventListener('mousemove', this.listenToDragEvent);

    // Touch event listeners
    // document.addEventListener('touchend', this.stopDragDelay);
    // document.addEventListener('touchmove', this.listenToDragEvent);
  }

  /**
   * Resolve the corrdinate to pixels
   *
   * @param {number} coordinate
   * @returns
   * @memberof NodeComponent
   */
  resolveToPixels(coordinate: number) {
    return `${coordinate}px`;
  }
}
