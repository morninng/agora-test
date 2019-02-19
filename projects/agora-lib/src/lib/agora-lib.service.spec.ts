import { TestBed } from '@angular/core/testing';

import { AgoraLibService } from './agora-lib.service';

describe('AgoraLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgoraLibService = TestBed.get(AgoraLibService);
    expect(service).toBeTruthy();
  });
});
