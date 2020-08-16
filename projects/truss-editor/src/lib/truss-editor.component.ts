import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { INode } from './interfaces/node.interface';
import { TrussContextService } from './services/truss-context.service';

@Component({
  selector: 'lib-truss-editor',
  templateUrl: './truss-editor.component.html',
  styles: [
  ]
})
export class TrussEditorComponent implements OnInit, AfterViewInit {
  @Input() inputTypes: any;
  @Input() nodeTypes: any;
  @Input() nodes: INode[];

  constructor(
    private context: TrussContextService,
  ) { }

  ngOnInit(): void {
    this.setTrussContext(this.inputTypes, this.nodeTypes);
  }

  ngAfterViewInit() {
    // console.log(this.inputTypes);
    // console.log(this.nodeTypes);
    // console.log(this.nodes);
  }

  /**
   * Set the truss context when the editor loads
   *
   * @param {*} inputTypes
   * @param {*} nodeTypes
   * @memberof TrussEditorComponent
   */
  setTrussContext(inputTypes: any, nodeTypes: any) {
    this.context.inputTypes = inputTypes;
    this.context.nodeTypes = nodeTypes;

    // For refreshing the connections
    this.context.shouldRecalculateConnections = true;
  }

  /**
   * Method to fetch the workspace cordinates once it renders
   *
   * @param {DOMRect} rect
   * @memberof TrussEditorComponent
   */
  getWorkspaceRect(rect: DOMRect) {
    // this.workspaceRect = rect;
    this.context.workspaceRect = rect;
  }
}
