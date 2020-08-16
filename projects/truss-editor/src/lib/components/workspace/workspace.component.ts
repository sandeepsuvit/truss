import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TrussContextService } from './../../services/truss-context.service';
import { getPortRectsByNodes } from './../../utils/connection-calculator.util';
import { addNewConnection } from './../../utils/nodes-reducer.util';

@Component({
  selector: 'lib-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit, AfterViewInit {
  @ViewChild('workspaceWrapper', { static: true }) workspaceWrapper: ElementRef;

  @Input() id: any; // Unique identifier
  @Input() nodes = [];

  @Output() setWorkspaceRect = new EventEmitter<DOMRect>();

  workspaceRect: DOMRect;
  portRects: DOMRect;

  constructor(
    private cdref: ChangeDetectorRef,
    private context: TrussContextService,
  ) { }

  ngOnInit(): void {
    this.initWorkspace();
  }

  ngAfterViewInit() {
    // this.initWorkspace();

    this.recalculateConnections();

    // Trigger change detection so that `workspaceDimensions` data update
    // doesn't throw change detection error
    this.cdref.detectChanges();

    // Get the details of the new connections
    this.context.getConnection().subscribe(conn => {
      const newConn = addNewConnection(this.nodes, conn.input, conn.output);

      this.nodes = newConn;

      // Recalculate connections
      if (this.context.shouldRecalculateConnections) {
        this.recalculateConnections();
        this.context.shouldRecalculateConnections = false;
      }

    });
  }

  /**
   * Initialize workspace context
   *
   * @memberof WorkspaceComponent
   */
  initWorkspace() {
    const workspaceRef = this.workspaceWrapper.nativeElement as HTMLElement;

    // Update the parent with the information of the workspace dimensions
    this.workspaceRect = workspaceRef.getBoundingClientRect();
    this.setWorkspaceRect.emit(this.workspaceRect);
  }

  /**
   * Recalculate the connectors coordinates
   *
   * @private
   * @memberof WorkspaceComponent
   */
  private recalculateConnections = () => {
    const portRects = getPortRectsByNodes(this.nodes);

    // Update the port rect coordinates
    this.portRects = portRects;
  }

  /**
   * Get connection id
   *
   * @param {*} node
   * @param {*} connection
   * @returns
   * @memberof WorkspaceComponent
   */
  getConnId(node: any, key: string, connection: any) {
    return `${connection.nodeId}${connection.portName}${node.id}${key}`;
  }

  /**
   * Get the connection from node
   *
   * @param {*} connection
   * @returns
   * @memberof WorkspaceComponent
   */
  getConnFrom(connection: any) {
    const fromPort = this.portRects[`${connection.nodeId}${connection.portName}`];
    // Place the line inside the port boundary
    const fromHalf = fromPort.width / 2;

    return {
      x: fromPort.x - this.workspaceRect.x + fromHalf,
      y: fromPort.y - this.workspaceRect.y + fromHalf
    };
  }

  /**
   * Get the connection to node
   *
   * @param {*} node
   * @param {*} connection
   * @returns
   * @memberof WorkspaceComponent
   */
  getConnTo(node: any, key: string) {
    const toPort = this.portRects[`${node.id}${key}`];
    const toHalf = toPort.width / 2;

    return {
      x: toPort.x - this.workspaceRect.x + toHalf,
      y: toPort.y - this.workspaceRect.y + toHalf
    };
  }
}
