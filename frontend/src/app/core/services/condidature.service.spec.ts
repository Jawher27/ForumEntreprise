import { TestBed } from '@angular/core/testing';

import { CondidatureService } from './condidature.service';

describe('CondidatureService', () => {
  let service: CondidatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CondidatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
