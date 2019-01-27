import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondBeforeEnterLayoutComponent } from './second-before-enter-layout.component';

describe('SecondBeforeEnterLayoutComponent', () => {
  let component: SecondBeforeEnterLayoutComponent;
  let fixture: ComponentFixture<SecondBeforeEnterLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondBeforeEnterLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondBeforeEnterLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
