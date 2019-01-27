import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkywayComponent } from './skyway.component';

describe('SkywayComponent', () => {
  let component: SkywayComponent;
  let fixture: ComponentFixture<SkywayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkywayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkywayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
