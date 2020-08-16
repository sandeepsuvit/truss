import { Component, ComponentRef, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ConnectorService } from '../../../services/connector.service';
import { ConnectionComponent } from '../../connection/connection.component';
import { TrussContextService } from './../../../services/truss-context.service';

@Component({
  selector: 'lib-port',
  templateUrl: './port.component.html',
  styleUrls: ['./port.component.scss']
})
export class PortComponent implements OnInit {
  @ViewChild('portWrapper', { static: true }) portWrapper: ElementRef;

  @Input() color = 'grey';
  @Input() name: string;
  @Input() type: any;
  @Input() nodeId: any;
  @Input() isInput = false;

  // Context acccessors
  nodeDispatch: any;
  inputTypes: any;
  workspaceRect: DOMRect;

  isDragging = false;
  port: any;
  // Reference to dynamically created connector
  connectorRef: ComponentRef<ConnectionComponent>;

  constructor(
    private context: TrussContextService,
    private connectorService: ConnectorService,
  ) { }

  ngOnInit(): void {
    this.initPortContext();
  }

  initPortContext() {
    const { nodeDispatch, inputTypes } = this.context;
    this.nodeDispatch = nodeDispatch;
    this.inputTypes = inputTypes;

    // this.workspaceRect = this.trussContext.workspaceRect;
  }

  private handleDrag = (event: any) => {
    if (this.connectorRef) {
      const connComp = this.connectorRef.instance;
      const lineRef = connComp.lineRefElem.nativeElement as SVGLineElement;

      lineRef.setAttribute('x2', `${event.clientX - this.context.workspaceRect.x}`);
      lineRef.setAttribute('y2', `${event.clientY - this.context.workspaceRect.y}`);
    }
  }

  private handleDragEnd = (event: any) => {
    if (event.target.dataset.portName) {
      const {
        portName: inputPortName,
        nodeId: inputNodeId,
        portType: inputNodeType
      } = event.target.dataset;

      const inputWillAcceptConnection = this.inputTypes[inputNodeType].acceptTypes.includes(this.type);
      if (inputWillAcceptConnection) {
        // Call event to dispatch add conection
        this.context.addConnection({
          output: { nodeId: this.nodeId, portName: this.name },
          input: { nodeId: inputNodeId, portName: inputPortName }
        });

        this.context.shouldRecalculateConnections = true;
      }
    }

    this.isDragging = false;

    // Remove listeners
    document.removeEventListener('mouseup', this.handleDragEnd);
    document.removeEventListener('mousemove', this.handleDrag);

    // Remove the temporary component after its resolved
    this.connectorService.removeComponent(this.connectorRef);
  }

  @HostListener('mousedown', ['$event'])
  handleDragStart(event: MouseEvent | TouchEvent) {
    if (!this.isInput) {
      event.stopPropagation();
      const startPort = this.portWrapper.nativeElement.getBoundingClientRect();

      const dragStartCoordinates = {
        x: startPort.x - this.context.workspaceRect.x + (startPort.width / 2),
        y: startPort.y - this.context.workspaceRect.y + (startPort.width / 2)
      };

      this.isDragging = true;

      this.connectorRef = this.connectorService.appendComponentToElement<ConnectionComponent>(
        ConnectionComponent,
        { from: dragStartCoordinates, to: dragStartCoordinates },
        '__node_editor_drag_connection__'
      );

      // Attach event listeners
      document.addEventListener('mouseup', this.handleDragEnd);
      document.addEventListener('mousemove', this.handleDrag);
    }
  }

}
