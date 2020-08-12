import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConnectionComponent } from './components/connection/connection.component';
import { IoPortComponent } from './components/io-port/io-port.component';
import { NodeComponent } from './components/node/node.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { TrussContextService } from './services/truss-context.service';
import { TrussEditorComponent } from './truss-editor.component';

@NgModule({
  declarations: [
    TrussEditorComponent,
    WorkspaceComponent,
    NodeComponent,
    ConnectionComponent,
    IoPortComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    TrussContextService,
  ],
  exports: [TrussEditorComponent]
})
export class TrussEditorModule { }
