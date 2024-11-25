import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './search.component';

describe('SearchComponent...', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('function validateIntervalIntern...', () => {
/*     it('should return true if minValue is less than or equal to maxValue', () => {
      expect(component.validateIntervalIntern(1, 2)).toBeTrue();
    });
 */
    // it('should return false if minValue is greater than maxValue', () => {
    //   expect(component.validateIntervalIntern(2, 1)).toBeFalse();
    // });

    // it('should return false if minValue or maxValue is negative', () => {
    //   expect(component.validateIntervalIntern(-1, 1)).toBeFalse();
    //   expect(component.validateIntervalIntern(0, -1)).toBeFalse();
    // });

    // it('should return false if minValue or maxValue is not integer', () => {
    //   expect(component.validateIntervalIntern(0.1, 1)).toBeFalse();
    //   expect(component.validateIntervalIntern(0, 1.1)).toBeFalse();
    // });

    // it('should return false if minValue or maxValue greater as 1000', () => {
    //   expect(component.validateIntervalIntern(1001, 1002)).toBeFalse();
    //   expect(component.validateIntervalIntern(0, 1001)).toBeFalse();
    // });
  });
});
