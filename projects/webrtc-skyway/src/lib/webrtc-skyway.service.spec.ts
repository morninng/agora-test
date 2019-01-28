import { TestBed } from '@angular/core/testing';

import { WebrtcSkywayService } from './webrtc-skyway.service';

describe('WebrtcSkywayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebrtcSkywayService = TestBed.get(WebrtcSkywayService);
    expect(service).toBeTruthy();
  });
});
