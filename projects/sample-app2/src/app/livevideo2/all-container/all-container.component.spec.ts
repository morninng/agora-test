import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllContainerComponent } from './all-container.component';

describe('AllContainerComponent', () => {
  let component: AllContainerComponent;
  let fixture: ComponentFixture<AllContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
