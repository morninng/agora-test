import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebrtcSkywayComponent } from './webrtc-skyway.component';

describe('WebrtcSkywayComponent', () => {
  let component: WebrtcSkywayComponent;
  let fixture: ComponentFixture<WebrtcSkywayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebrtcSkywayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebrtcSkywayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
