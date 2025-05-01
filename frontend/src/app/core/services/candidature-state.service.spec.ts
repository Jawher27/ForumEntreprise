import { TestBed } from '@angular/core/testing';

import { CandidatureStateService } from './candidature-state.service';

describe('CandidatureStateService', () => {
  let service: CandidatureStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidatureStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
