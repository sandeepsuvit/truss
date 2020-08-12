import { NgModule } from '@angular/core';
import { TrussEditorComponent } from './truss-editor.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';

@NgModule({
  declarations: [
    TrussEditorComponent,
    WorkspaceComponent
  ],
  imports: [
  ],
  exports: [TrussEditorComponent]
})
export class TrussEditorModule { }
