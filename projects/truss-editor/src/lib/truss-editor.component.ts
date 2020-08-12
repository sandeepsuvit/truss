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

  // Container for setting the workspace dimension
  workspaceDimensions: DOMRect;

  constructor(
    private trussContext: TrussContextService,
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
    this.trussContext.inputTypes = inputTypes;
    this.trussContext.nodeTypes = nodeTypes;
  }

  /**
   * Method to fetch the workspace cordinates once it renders
   *
   * @param {DOMRect} rect
   * @memberof TrussEditorComponent
   */
  handleUpdateWorkspaceDimensions(rect: DOMRect) {
    console.log(rect);
    this.workspaceDimensions = rect;
  }
}
