import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConnectionComponent } from './components/connection/connection.component';
import { ControlComponent } from './components/io-port/control/control.component';
import { InputComponent } from './components/io-port/input/input.component';
import { IoPortComponent } from './components/io-port/io-port.component';
import { OutputComponent } from './components/io-port/output/output.component';
import { PortComponent } from './components/io-port/port/port.component';
import { NodeComponent } from './components/node/node.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { ConnectorService } from './services/connector.service';
import { TrussContextService } from './services/truss-context.service';
import { TrussEditorComponent } from './truss-editor.component';

@NgModule({
  declarations: [
    TrussEditorComponent,
    WorkspaceComponent,
    NodeComponent,
    ConnectionComponent,
    IoPortComponent,
    InputComponent,
    OutputComponent,
    PortComponent,
    ControlComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    TrussContextService,
    ConnectorService,
  ],
  exports: [TrussEditorComponent]
})
export class TrussEditorModule { }
