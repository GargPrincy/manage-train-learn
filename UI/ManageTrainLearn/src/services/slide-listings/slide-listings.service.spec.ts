import { TestBed } from '@angular/core/testing';

import { SlideListingsService } from './slide-listings.service';

describe('SlideListingsService', () => {
  let service: SlideListingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlideListingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
