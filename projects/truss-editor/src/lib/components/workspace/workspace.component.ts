import { getPortRectsByNodes, getPortRect } from './../../utils/connection-calculator.util';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'lib-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit, AfterViewInit {
  @ViewChild('workspace', { read: ElementRef, static: true }) workspaceRef: ElementRef;

  @Input() id: any; // Unique identifier
  @Input() nodes = [];

  @Output() updateWorkspaceRect = new EventEmitter<DOMRect>();

  workspace: HTMLElement;
  workspaceRect: DOMRect;

  portRects: DOMRect;

  constructor(
    private cdref: ChangeDetectorRef
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
  }

  /**
   * Initialize workspace context
   *
   * @memberof WorkspaceComponent
   */
  initWorkspace() {
    this.workspace = this.workspaceRef.nativeElement;

    // Update the parent with the information of the workspace dimensions
    this.workspaceRect = this.workspace.getBoundingClientRect();
    this.updateWorkspaceRect.emit(this.workspaceRect);
  }

  /**
   * Recalculate the connectors coordinates
   *
   * @private
   * @memberof WorkspaceComponent
   */
  private recalculateConnections = () => {
    const portRects = getPortRectsByNodes(this .nodes);

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
