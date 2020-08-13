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

  constructor(
    private cdref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initWorkspace();
  }

  ngAfterViewInit() {
    // this.initWorkspace();

    // Trigger change detection so that `workspaceDimensions` data update
    // doesn't throw change detection error
    // this.cdref.detectChanges();
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

  private recalculateConnections = () => {
    
  }

  /**
   * Handle dragging event
   *
   * @param {boolean} enabled
   * @memberof WorkspaceComponent
   */
  handleOnDrag(enabled: boolean) {
    if (enabled) {
      console.log('Handling drag...');
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
      console.log('Handling drag end...');
    }
  }
}
