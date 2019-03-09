import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgoraBroadcastComponent } from './agora-broadcast.component';

describe('AgoraBroadcastComponent', () => {
  let component: AgoraBroadcastComponent;
  let fixture: ComponentFixture<AgoraBroadcastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgoraBroadcastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgoraBroadcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
