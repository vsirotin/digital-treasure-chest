import { TestBed } from '@angular/core/testing';

import { BrowserLocalStorageService } from './browser-local-storage.service';

describe('BrowserLocalStorageService', () => {
  let service: BrowserLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrowserLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
