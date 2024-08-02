import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogSettingComponent } from './log-setting.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { LoggerFactory } from '@vsirotin/log4ts';
import { DebugElement } from '@angular/core';
import { MatRadioButton, MatRadioChange } from '@angular/material/radio';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatRadioButtonHarness } from '@angular/material/radio/testing';

describe('LogSettingComponent', () => {
  let component: LogSettingComponent;
  let fixture: ComponentFixture<LogSettingComponent>;
  let buttonUpdate: DebugElement;
  let buttonReset: DebugElement;
  let loader: HarnessLoader;

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
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  afterEach(() => {
    LoggerFactory.clearAllLoggers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  // function selectButtonAllLevels(fixture: ComponentFixture<LogSettingComponent>) {
  //   console.log("fixture=", fixture);
  //   const radioButton = fixture.debugElement.queryAll(By.css('mat-radio-button'))[4];
  //   console.log("radioButton=", radioButton.name);
  //   radioButton.nativeElement.click();
  //   fixture.detectChanges();
  // }


  describe('After start (by Default)...', () => {
    it('should the button Update be disabled"', async () => {
      expect(buttonUpdate.nativeElement.disabled).toBe(true)
    });

    it('should the button Reset be disabled"', () => {
      expect(buttonReset.nativeElement.disabled).toBe(true)
    });


    describe('after selection the level Loggin set off... ', () => {

      async function radioButtonChecked(loader: HarnessLoader, buttonNumber: number, fixture: ComponentFixture<LogSettingComponent>) {
        const buttons = await loader.getAllHarnesses(MatRadioButtonHarness);
        const radioButton = buttons[buttonNumber];
        await radioButton.check();
        await fixture.whenStable();
        fixture.detectChanges();
      }

      async function radioButtonLoggingSetOffChecked(loader: HarnessLoader, fixture: ComponentFixture<LogSettingComponent>) {
        const buttonNumber = 4;
        await radioButtonChecked(loader, buttonNumber, fixture);
      }

      beforeEach(async () => {
        await radioButtonLoggingSetOffChecked(loader, fixture);
      });
      
      it('should the button Update be enabled"', async () => {
        expect(buttonUpdate.nativeElement.disabled).toBe(false)
      });
  
      it('should the button Reset be enabled"', () => {
        expect(buttonReset.nativeElement.disabled).toBe(false)
      });
  
      it('should level set-off be selected"', () => {
        expect(component.selectedLogLevel).toBe('set-off');
      });

      it('should log level be 2"', () => {
        expect(component.logger.getLogLevel()).toBe(2);
      });

      describe('after selection the default logging ... ', () => {
        async function radioButtonDefaultLoggingChecked(loader: HarnessLoader, fixture: ComponentFixture<LogSettingComponent>) {
          const buttonNumber = 2;
          await radioButtonChecked(loader, buttonNumber, fixture);
        }
  
        beforeEach(async () => {
          await radioButtonDefaultLoggingChecked(loader, fixture);
        });

        it('should the button Update be disanled"', async () => {
          expect(buttonUpdate.nativeElement.disabled).toBe(true)
        });
    
        it('should the button Reset be disabled"', () => {
          expect(buttonReset.nativeElement.disabled).toBe(true)
        });
    
        it('should level set-off selected"', () => {
          expect(component.selectedLogLevel).toBe('err-warn');
        });

        it('should log level be 2"', () => {
          expect(component.logger.getLogLevel()).toBe(2);
        });

      });
     
    });
   
    
  });

 

});




