import { TestBed } from '@angular/core/testing';

import { TrussEditorService } from './truss-editor.service';

describe('TrussEditorService', () => {
  let service: TrussEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrussEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
