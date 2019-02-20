import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgoraThreeComponent } from './agora-three.component';

describe('AgoraThreeComponent', () => {
  let component: AgoraThreeComponent;
  let fixture: ComponentFixture<AgoraThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgoraThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgoraThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
