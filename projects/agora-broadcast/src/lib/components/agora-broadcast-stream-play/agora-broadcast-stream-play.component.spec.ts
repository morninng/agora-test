import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgoraBroadcastStreamPlayComponent } from './agora-broadcast-stream-play.component';

describe('AgoraBroadcastStreamPlayComponent', () => {
  let component: AgoraBroadcastStreamPlayComponent;
  let fixture: ComponentFixture<AgoraBroadcastStreamPlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgoraBroadcastStreamPlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgoraBroadcastStreamPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
