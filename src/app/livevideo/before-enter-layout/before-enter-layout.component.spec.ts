import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeforeEnterLayoutComponent } from './before-enter-layout.component';

describe('BeforeEnterLayoutComponent', () => {
  let component: BeforeEnterLayoutComponent;
  let fixture: ComponentFixture<BeforeEnterLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeforeEnterLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeforeEnterLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
