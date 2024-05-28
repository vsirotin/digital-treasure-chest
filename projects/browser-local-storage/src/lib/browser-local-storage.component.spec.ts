import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserLocalStorageComponent } from './browser-local-storage.component';

describe('BrowserLocalStorageComponent', () => {
  let component: BrowserLocalStorageComponent;
  let fixture: ComponentFixture<BrowserLocalStorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserLocalStorageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrowserLocalStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
