import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrussEditorComponent } from './truss-editor.component';

describe('TrussEditorComponent', () => {
  let component: TrussEditorComponent;
  let fixture: ComponentFixture<TrussEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrussEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrussEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
