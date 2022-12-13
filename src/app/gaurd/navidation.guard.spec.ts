import { TestBed } from '@angular/core/testing';

import { NavidationGuard } from './navidation.guard';

describe('NavidationGuard', () => {
  let guard: NavidationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NavidationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
