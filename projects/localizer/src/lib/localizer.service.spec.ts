import { TestBed } from '@angular/core/testing';

import { LocalizerService } from './localizer.service';

describe('LocalizerService', () => {
  let service: LocalizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
