import { TestBed } from '@angular/core/testing';

import { AgoraBroadcastService } from './agora-broadcast.service';

describe('AgoraBroadcastService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgoraBroadcastService = TestBed.get(AgoraBroadcastService);
    expect(service).toBeTruthy();
  });
});
