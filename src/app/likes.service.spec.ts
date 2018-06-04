import { TestBed, inject } from '@angular/core/testing';

import { LikesService } from './likes.service';

describe('LikesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LikesService]
    });
  });

  it('should be created', inject([LikesService], (service: LikesService) => {
    expect(service).toBeTruthy();
  }));
});
