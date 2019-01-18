import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgoraIoComponent } from './agora-io.component';

describe('AgoraIoComponent', () => {
  let component: AgoraIoComponent;
  let fixture: ComponentFixture<AgoraIoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgoraIoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgoraIoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
