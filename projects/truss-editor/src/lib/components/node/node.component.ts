import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ICoordinates } from '../../interfaces/coordinates.interface';
import { TrussContextService } from '../../services/truss-context.service';

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
  @Input() type: any;

  // Custom properties
  label: string;
  offset: any;
  coordinates: ICoordinates = null;
  startCoordinates: ICoordinates = null;
  isDragging = false;

  // Events
  @Output() onDrag = new EventEmitter<any>();
  @Output() onDragEnd = new EventEmitter<any>();

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
   * Start dragging the element
   *
   * @private
   * @memberof NodeComponent
   */
  private startDragging = (event: MouseEvent | TouchEvent) => {
    const nodeRect = this.nodeWrapper.nativeElement.getBoundingClientRect();
    this.offset = { x: this.startCoordinates.x - nodeRect.left, y: this.startCoordinates.y - nodeRect.top };

    this.updateCoordinates(event);
    this.isDragging = true;

    window.addEventListener('mouseup', this.stopDrag);
    window.addEventListener('mousemove', this.updateCoordinates);
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

    // This will call the parent function to update the coordinates in the parent
    this.onDrag.emit(true);
  }

  /**
   * Stop dragging
   *
   * @private
   * @memberof NodeComponent
   */
  private stopDrag = (event: any) => {
    this.isDragging = false;
    window.removeEventListener('mouseup', this.stopDrag);
    window.removeEventListener('mousemove', this.updateCoordinates);

    // This will call the parent function to update the coordinates in the parent
    this.onDragEnd.emit(true);
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
  resolveToPixes(coordinate: number) {
    return `${coordinate}px`;
  }
}
