import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class TrussContextService {
    private _inputTypes: any;
    private _nodeTypes: any;
    private _nodeDispatch: any;
    private _shouldRecalculateConnections: boolean;

    private _workspaceRect: DOMRect;

    private _addConnectionEvent = new Subject<any>();

    constructor() { }

    get inputTypes(): any {
        return this._inputTypes;
    }

    set inputTypes(inputTypes: any) {
        this._inputTypes = inputTypes;
    }

    get nodeTypes(): any {
        return this._nodeTypes;
    }

    set nodeTypes(nodeTypes: any) {
        this._nodeTypes = nodeTypes;
    }

    get nodeDispatch(): any {
        return this._nodeDispatch;
    }

    set nodeDispatch(nodeDispatch: any) {
        this._nodeDispatch = nodeDispatch;
    }

    get shouldRecalculateConnections(): boolean {
        return this._shouldRecalculateConnections;
    }

    set shouldRecalculateConnections(shouldRecalculateConnections: boolean) {
        this._shouldRecalculateConnections = shouldRecalculateConnections;
    }

    get workspaceRect(): DOMRect {
        return this._workspaceRect;
    }

    set workspaceRect(workspaceRect: DOMRect) {
        this._workspaceRect = workspaceRect;
    }

    addConnection(connection: any) {
        this._addConnectionEvent.next(connection);
    }

    getConnection() {
        return this._addConnectionEvent.asObservable();
    }
}
