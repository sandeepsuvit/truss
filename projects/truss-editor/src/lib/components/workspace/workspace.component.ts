import { Component, OnInit, Input, ViewChild, AfterViewInit, ElementRef, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'lib-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit, AfterViewInit {
  @ViewChild('workspace') workspaceRef: ElementRef;

  @Input() id: any; // Unique identifier
  @Input() nodes = [];

  @Output() updateWorkspaceDimensions = new EventEmitter<DOMRect>();

  workspace: HTMLElement;
  workspaceDimensions: DOMRect;

  constructor(
    private cdref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.workspace = this.workspaceRef.nativeElement;

    // Update the parent with the information of the workspace dimensions
    this.workspaceDimensions = this.workspace.getBoundingClientRect();
    this.updateWorkspaceDimensions.emit(this.workspaceDimensions);

    // Trigger change detection so that `workspaceDimensions` data update
    // doesn't throw change detection error
    this.cdref.detectChanges();
  }
}
