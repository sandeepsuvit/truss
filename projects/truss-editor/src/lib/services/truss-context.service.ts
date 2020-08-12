import { Injectable } from '@angular/core';

@Injectable()
export class TrussContextService {
    private _inputTypes: any;
    private _nodeTypes: any;

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
}
