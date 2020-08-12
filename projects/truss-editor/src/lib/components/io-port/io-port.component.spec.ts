import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IoPortComponent } from './io-port.component';

describe('IoPortComponent', () => {
  let component: IoPortComponent;
  let fixture: ComponentFixture<IoPortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IoPortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IoPortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
