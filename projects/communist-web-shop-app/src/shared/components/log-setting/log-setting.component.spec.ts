import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogSettingComponent } from './log-setting.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { LoggerFactory } from '@vsirotin/log4ts';
import { DebugElement } from '@angular/core';
import { MatRadioButton, MatRadioChange } from '@angular/material/radio';

describe('LogSettingComponent', () => {
  let component: LogSettingComponent;
  let fixture: ComponentFixture<LogSettingComponent>;
  let buttonUpdate: DebugElement;
  let buttonReset: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogSettingComponent, BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogSettingComponent);
    component = fixture.componentInstance;

    buttonUpdate = fixture.debugElement.query(By.css('#bt-update'));
    buttonReset= fixture.debugElement.query(By.css('#bt-reset'));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    LoggerFactory.clearAllLoggers();
  });

  // function selectButtonAllLevels(fixture: ComponentFixture<LogSettingComponent>) {
  //   console.log("fixture=", fixture);
  //   const radioButton = fixture.debugElement.queryAll(By.css('mat-radio-button'))[4];
  //   console.log("radioButton=", radioButton.name);
  //   radioButton.nativeElement.click();
  //   fixture.detectChanges();
  // }


  describe('After start (by Default)...', () => {
    it('should the button Update be disabled"', () => {
      expect(buttonUpdate.nativeElement.disabled).toBe(true)
    });

    it('should the button Reset be disabled"', () => {
      expect(buttonReset.nativeElement.disabled).toBe(true)
    });

    it('should level error-warn selected"', () => {
      expect(component.selectedLogLevel).toBe('err-warn');
    });

    xit('by selection should the onDebugLevelChange called', async () => {
      spyOn(component, 'onDebugLevelChange'); 

      const radioButtonDebugElement = fixture.debugElement.queryAll(By.css('mat-radio-button'))[4];
      const radioButton = radioButtonDebugElement.componentInstance as MatRadioButton;

      radioButtonDebugElement.triggerEventHandler('check', {});
     

      // Ensure the radio button is rendered
      expect(radioButton).toBeDefined();



     // Simulate the click event using dispatchEvent
     radioButton.checked = true;
     //radioButtonDebugElement.nativeElement.dispatchEvent(new Event('click'));
     //radioButton._inputElement.nativeElement.dispatchEvent(new Event('click'));
     radioButton._onInputClick(new Event('click'));
     const changeDetalis: MatRadioChange = {source: radioButton, value: 'aaa'};
     //radioButton.change.emit(changeDetalis);

     await radioButtonDebugElement.nativeElement.click();
      
      //radioButton.checked = true;
      //radioButton._inputElement.nativeElement.dispatchEvent(new Event('change'));


      fixture.detectChanges();
      
      await fixture.whenStable();
      expect(radioButton.checked).toBeTruthy();
       // Verify the method call
      expect(component.onDebugLevelChange).toHaveBeenCalledWith("QQQ")

      

      // Wait for all asynchronous tasks to complete
      //await fixture.whenStable();

      // Trigger change detection
      //fixture.detectChanges();
      //expect(component.onDebugLevelChange).toHaveBeenCalledWith("aaa");
    });

    xdescribe('after selection the level Loggin set off... ', () => {

      

      it('should the button Update be enabled"', () => {
        fixture.debugElement.queryAll(By.css('mat-radio-button'))[4].nativeElement.click();
        fixture.detectChanges();
        expect(buttonUpdate.nativeElement.disabled).toBe(false)
      });
  
      it('should the button Reset be disabled"', () => {
        expect(buttonReset.nativeElement.disabled).toBe(true)
      });
  
      it('should level error-debug selected"', () => {
        expect(component.selectedLogLevel).toBe('err-debug');
      });

    });
   
    
  });


});


