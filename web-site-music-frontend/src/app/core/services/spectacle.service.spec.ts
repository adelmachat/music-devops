import { TestBed } from '@angular/core/testing';

import { SpectacleService } from './spectacle.service';

describe('SpectacleService', () => {
  let service: SpectacleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpectacleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
