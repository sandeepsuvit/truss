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
    const portRects = Object.values(this.nodes).reduce((obj, node) => {
      if (node.connections) {
        Object.entries(node.connections).forEach(([inputName, output]) => {
          obj[node.id + inputName] = document
            .querySelector(
              `[data-node-id="${node.id}"] [data-port-name="${inputName}"]`
            )
            .getBoundingClientRect();
          obj[output[`nodeId`] + output[`portName`]] = document
            .querySelector(
              `[data-node-id="${output[`nodeId`]}"] [data-port-name="${output[`portName`]}"]`
            )
            .getBoundingClientRect();
        });
      }
      return obj;
    }, {});

    // Update the port rect coordinates
    this.portRects = portRects;
    console.log(this.portRects);
  }

  /**
   * Handle dragging event
   *
   * @param {boolean} enabled
   * @memberof WorkspaceComponent
   */
  handleOnDrag(enabled: boolean) {
    if (enabled) {
      // console.log('Handling drag...');
      this.recalculateConnections();
    }
  }

  /**
   * Handle drag end event
   *
   * @param {boolean} enabled
   * @memberof WorkspaceComponent
   */
  handleOnDragEnd(enabled: boolean) {
    if (enabled) {
      // console.log('Handling drag end...');
      this.recalculateConnections();
    }
  }

  /**
   * Get the connection from node
   *
   * @param {*} node
   * @param {*} connection
   * @returns
   * @memberof WorkspaceComponent
   */
  getFrom(node: any, connection: any) {
    const fromPort = this.portRects[connection.value.nodeId + connection.value.portName];
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
  getTo(node: any, connection: any) {
    const toPort = this.portRects[node.id + connection.key];
    const toHalf = toPort.width / 2;

    return {
      x: toPort.x - this.workspaceRect.x + toHalf,
      y: toPort.y - this.workspaceRect.y + toHalf
    };
  }
}
