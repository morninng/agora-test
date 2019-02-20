import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeforeEnterComponent } from './before-enter.component';

describe('BeforeEnterComponent', () => {
  let component: BeforeEnterComponent;
  let fixture: ComponentFixture<BeforeEnterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeforeEnterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeforeEnterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
