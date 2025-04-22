import { TestBed } from '@angular/core/testing';

import { TypeAnnouncementService } from './type-announcement.service';

describe('TypeAnnouncementService', () => {
  let service: TypeAnnouncementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeAnnouncementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
