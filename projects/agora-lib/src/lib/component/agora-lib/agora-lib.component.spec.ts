import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgoraLibComponent } from './agora-lib.component';

describe('AgoraLibComponent', () => {
  let component: AgoraLibComponent;
  let fixture: ComponentFixture<AgoraLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgoraLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgoraLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
