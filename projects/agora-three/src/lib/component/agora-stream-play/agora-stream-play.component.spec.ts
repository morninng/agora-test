import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgoraStreamPlayComponent } from './agora-stream-play.component';

describe('AgoraStreamPlayComponent', () => {
  let component: AgoraStreamPlayComponent;
  let fixture: ComponentFixture<AgoraStreamPlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgoraStreamPlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgoraStreamPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
