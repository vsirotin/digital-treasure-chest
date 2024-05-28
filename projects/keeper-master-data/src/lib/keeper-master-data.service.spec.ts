import { TestBed } from '@angular/core/testing';

import { KeeperMasterDataService } from './keeper-master-data.service';

describe('KeeperMasterDataService', () => {
  let service: KeeperMasterDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeeperMasterDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
