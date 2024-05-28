import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeeperMasterDataComponent } from './keeper-master-data.component';

describe('KeeperMasterDataComponent', () => {
  let component: KeeperMasterDataComponent;
  let fixture: ComponentFixture<KeeperMasterDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeeperMasterDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KeeperMasterDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
