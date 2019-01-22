import { TestBed, async, inject } from '@angular/core/testing';

import { BeforeenterBeforeGameGuard } from './beforeenter-before-game.guard';

describe('BeforeenterBeforeGameGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BeforeenterBeforeGameGuard]
    });
  });

  it('should ...', inject([BeforeenterBeforeGameGuard], (guard: BeforeenterBeforeGameGuard) => {
    expect(guard).toBeTruthy();
  }));
});
