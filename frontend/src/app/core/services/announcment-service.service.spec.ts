import { TestBed } from '@angular/core/testing';

import { AnnouncmentServiceService } from './announcment-service.service';

describe('AnnouncmentServiceService', () => {
  let service: AnnouncmentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnouncmentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
