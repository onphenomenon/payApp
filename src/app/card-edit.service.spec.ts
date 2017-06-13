import { TestBed, inject } from '@angular/core/testing';

import { CardEditService } from './card-edit.service';

describe('CardEditService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardEditService]
    });
  });

  it('should be created', inject([CardEditService], (service: CardEditService) => {
    expect(service).toBeTruthy();
  }));
});
