import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedStreamComponent } from './added-stream.component';

describe('AddedStreamComponent', () => {
  let component: AddedStreamComponent;
  let fixture: ComponentFixture<AddedStreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddedStreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
