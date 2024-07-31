import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogSettingComponent } from './log-setting.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('LogSettingComponent', () => {
  let component: LogSettingComponent;
  let fixture: ComponentFixture<LogSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogSettingComponent, BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle button click with id "bt-update"', async () => {
    spyOn(component, 'onUpdate'); 
    const button = fixture.debugElement.query(By.css('#bt-update'));
    console.log(button);
    button.nativeElement.click();
    await fixture.whenStable();
    //expect(component.onUpdate).toHaveBeenCalled();
    expect(button.nativeElement.disabled).toBe(true)

    const button1 = fixture.debugElement.query(By.css('#bt-update')).nativeElement;
    console.log(button1);
  });
});
