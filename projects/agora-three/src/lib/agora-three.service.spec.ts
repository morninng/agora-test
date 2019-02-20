import { TestBed } from '@angular/core/testing';

import { AgoraThreeService } from './agora-three.service';

describe('AgoraThreeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgoraThreeService = TestBed.get(AgoraThreeService);
    expect(service).toBeTruthy();
  });
});
