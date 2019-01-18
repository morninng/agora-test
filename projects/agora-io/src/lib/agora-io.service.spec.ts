import { TestBed } from '@angular/core/testing';

import { AgoraIoService } from './agora-io.service';

describe('AgoraIoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgoraIoService = TestBed.get(AgoraIoService);
    expect(service).toBeTruthy();
  });
});
