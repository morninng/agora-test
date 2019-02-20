import { TestBed } from '@angular/core/testing';

import { AgoraLibraryService } from './agora-library.service';

describe('AgoraLibraryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgoraLibraryService = TestBed.get(AgoraLibraryService);
    expect(service).toBeTruthy();
  });
});
