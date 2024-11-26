import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChetContentUpdateComponent } from './chet-content-update.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ChetContentUpdateComponent', () => {
  let component: ChetContentUpdateComponent;
  let fixture: ComponentFixture<ChetContentUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChetContentUpdateComponent,
          BrowserAnimationsModule
  
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChetContentUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
