import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishStreamComponent } from './publish-stream.component';

describe('PublishStreamComponent', () => {
  let component: PublishStreamComponent;
  let fixture: ComponentFixture<PublishStreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishStreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
