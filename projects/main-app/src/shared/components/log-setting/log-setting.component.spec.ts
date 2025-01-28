import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogSettingComponent } from './log-setting.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';
import { MatButtonHarness } from '@angular/material/button/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatRadioButtonHarness } from '@angular/material/radio/testing';
import { MatInputHarness } from '@angular/material/input/testing';

describe('LogSettingComponent', () => {
  let component: LogSettingComponent;
  let fixture: ComponentFixture<LogSettingComponent>;
  let loader: HarnessLoader;

  let buttonUpdate: MatButtonHarness;
  let buttonReset: MatButtonHarness;

  let radioButtons: MatRadioButtonHarness[];
  let radioButtonErrWarn: MatRadioButtonHarness;
  let radioButtonLoggingSetOff: MatRadioButtonHarness;
  let textInput : MatInputHarness;

  let loggerComponent: ILogger;
  let loggerTestScript: ILogger;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogSettingComponent, BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogSettingComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);

    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    buttonUpdate = buttons[0];
    buttonReset = buttons[1];

    radioButtons = await loader.getAllHarnesses(MatRadioButtonHarness);
    radioButtonErrWarn = radioButtons[2];
    radioButtonLoggingSetOff = radioButtons[4];

    textInput = await loader.getHarness(MatInputHarness);

    loggerComponent = component.logger;
    loggerTestScript = LoggerFactory.getLogger("eu.sirotin.demo-app.shared/components/log-setting/log-setting.component.spec.ts");

  });

  afterEach(() => {
    LoggerFactory.clearAllLoggers();
  });

  async function getCheckedRadioButton(): Promise<string> {

    const res = radioButtons.find(async (radioButton) => {
      if(await radioButton.isChecked()) return true;
      return false;
    });

    const id = (res instanceof MatRadioButtonHarness) ? await res.getValue() : "NOT_FOUND";
    return id as string;
  }

  async function findCheckedRadioButton(): Promise<string> {
    let checkedRadioButton: MatRadioButtonHarness | null = null;
    for (const radioButton of radioButtons) {
      const isChecked = await radioButton.isChecked();
      if (isChecked) {
        checkedRadioButton = radioButton;
        break;
      }
    }

    if(checkedRadioButton == null) return "NOT_FOUND";

    return  await checkedRadioButton?.getValue() as string;
  }

  async function checkExpectations(expectations :{
    isUpdateButtonDisabled: boolean,
    isResetDisabled: boolean,
    textInInput: string,
    checkedRadioButton: string|null,
    selectedLogLevel: string,
    logLevelOfLogger1: number,
    logLevelByLogger2: number}) : Promise<string> {
      if(await buttonUpdate.isDisabled() != expectations.isUpdateButtonDisabled) return "Expectations for buttonUpdate are not met";
      if(await buttonReset.isDisabled() != expectations.isResetDisabled) return "Expectations for buttonReset are not met";
      if(await textInput.getValue() != expectations.textInInput) return "Expectations for textInput are not met";
      const checkedRadioButtonValue = await getCheckedRadioButton();
      if(checkedRadioButtonValue != expectations.checkedRadioButton) return `Expectations for checkedRadioButton are not met. Should be ${expectations.checkedRadioButton} but is  ${checkedRadioButtonValue}`;
      if(component.selectedLogLevel != expectations.selectedLogLevel) return `Expectations for selectedLogLevel are not met. Should be ${expectations.selectedLogLevel} but is  ${component.selectedLogLevel}`;
      if(loggerComponent.getLogLevel() != expectations.logLevelOfLogger1) return "Expectations for logLevelOfLogger1 are not met";
      if(loggerTestScript.getLogLevel() != expectations.logLevelByLogger2) return "Expectations for logLevelByLogger2 are not met";
      return "";
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('After start (by Default)...', () => {
    it('default values are set', async () => {     
      expect(await buttonUpdate.isDisabled()).toBe(true);    
      expect(await buttonReset.isDisabled()).toBe(true); 
      expect(await textInput.getValue()).toBe(""); 
      expect(await findCheckedRadioButton()).toBe("err-warn"); 
      expect(component.selectedLogLevel).toBe("err-warn");
      expect(loggerComponent.getLogLevel()).toBe(2);
      expect(loggerTestScript.getLogLevel()).toBe(2);      
     });
  });

  describe('After check of button "Set Off"...', () => {

    beforeEach(async () => {
      await radioButtonLoggingSetOff.check();
    });

    it('should the buttons Update and Reset be enabled', async () => {
      expect(await buttonUpdate.isDisabled()).toBe(false);    
      expect(await buttonReset.isDisabled()).toBe(false); 
      expect(await textInput.getValue()).toBe(""); 
      expect(await findCheckedRadioButton()).toBe("set-off"); 
      expect(component.selectedLogLevel).toBe("set-off");
      expect(loggerComponent.getLogLevel()).toBe(2);
      expect(loggerTestScript.getLogLevel()).toBe(2);
    });

      describe('After check of button "Errors and warnings"...', () => {

        beforeEach(async () => {
          await radioButtonErrWarn.check();
        });
    
        it('should the buttons Update and Reset be enabled and default values indirect reset', async () => {
          expect(await buttonUpdate.isDisabled()).toBe(true);    
          expect(await buttonReset.isDisabled()).toBe(true); 
          expect(await textInput.getValue()).toBe(""); 
          expect(await findCheckedRadioButton()).toBe("err-warn"); 
          expect(component.selectedLogLevel).toBe("err-warn");
          expect(loggerComponent.getLogLevel()).toBe(2);
          expect(loggerTestScript.getLogLevel()).toBe(2);    
        });
      });

      describe('After click on button "Update"...', () => {

        beforeEach(async () => {
          await buttonUpdate.click();
        });
    
        it('should the button Update be disabled, and the buttons Reset be enabled and log levels by both loggegers 4', async () => {
          expect(await buttonUpdate.isDisabled()).toBe(true);    
          expect(await buttonReset.isDisabled()).toBe(false); 
          expect(await textInput.getValue()).toBe(""); 
          expect(await findCheckedRadioButton()).toBe("set-off"); 
          expect(component.selectedLogLevel).toBe("set-off");
          expect(loggerComponent.getLogLevel()).toBe(4);
          expect(loggerTestScript.getLogLevel()).toBe(4);    
        });

        describe('After click on the button Reset ...', () => {

          beforeEach(async () => {
            await buttonReset.click();
          });

          it('default values are set', async () => {     
            expect(await buttonUpdate.isDisabled()).toBe(true);    
            expect(await buttonReset.isDisabled()).toBe(true); 
            expect(await textInput.getValue()).toBe(""); 
            expect(await findCheckedRadioButton()).toBe("err-warn"); 
            expect(component.selectedLogLevel).toBe("err-warn");
            expect(loggerComponent.getLogLevel()).toBe(2);
            expect(loggerTestScript.getLogLevel()).toBe(2);      
           });

           describe('After check of button "Set Off"...', () => {

            beforeEach(async () => {
              await radioButtonLoggingSetOff.check();
            });
        
            it('should the buttons Update and Reset be enabled', async () => {
              expect(await buttonUpdate.isDisabled()).toBe(false);    
              expect(await buttonReset.isDisabled()).toBe(false); 
              expect(await textInput.getValue()).toBe(""); 
              expect(await findCheckedRadioButton()).toBe("set-off"); 
              expect(component.selectedLogLevel).toBe("set-off");
              expect(loggerComponent.getLogLevel()).toBe(2);
              expect(loggerTestScript.getLogLevel()).toBe(2);
            });
          });
        });
      });
  });
  describe('After insert a path relevant for both loggers in the input field and check of button "Set Off"...', () => {

    beforeEach(async () => {
      await textInput.setValue("shared/components/log-setting/log-setting.component*");
      await radioButtonLoggingSetOff.check();
    });

    it('should the buttons Update and Reset be enabled', async () => {
      expect(await buttonUpdate.isDisabled()).toBe(false);    
      expect(await buttonReset.isDisabled()).toBe(false); 
      expect(await textInput.getValue()).toBe("shared/components/log-setting/log-setting.component*"); 
      expect(await findCheckedRadioButton()).toBe("set-off"); 
      expect(component.selectedLogLevel).toBe("set-off");
      expect(loggerComponent.getLogLevel()).toBe(2);
      expect(loggerTestScript.getLogLevel()).toBe(2);
    });

    describe('After click on button "Update"...', () => {

      beforeEach(async () => {
        await buttonUpdate.click();
      });
  
      it('should the button Update be disabled, and the buttons Reset be enabled and log levels by both loggegers 4', async () => {
        expect(await buttonUpdate.isDisabled()).toBe(true);    
        expect(await buttonReset.isDisabled()).toBe(false); 
        expect(await textInput.getValue()).toBe("shared/components/log-setting/log-setting.component*"); 
        expect(await findCheckedRadioButton()).toBe("set-off"); 
        expect(component.selectedLogLevel).toBe("set-off");
        expect(loggerComponent.getLogLevel()).toBe(4);
        expect(loggerTestScript.getLogLevel()).toBe(4);    
      });

      describe('After click on the button Reset ...', () => {

        beforeEach(async () => {
          await buttonReset.click();
        });

        it('default values are set', async () => {     
          expect(await buttonUpdate.isDisabled()).toBe(true);    
          expect(await buttonReset.isDisabled()).toBe(true); 
          expect(await textInput.getValue()).toBe(""); 
          expect(await findCheckedRadioButton()).toBe("err-warn"); 
          expect(component.selectedLogLevel).toBe("err-warn");
          expect(loggerComponent.getLogLevel()).toBe(2);
          expect(loggerTestScript.getLogLevel()).toBe(2);      
         });

         describe('After check of button "Set Off"...', () => {

          beforeEach(async () => {
            await radioButtonLoggingSetOff.check();
          });
      
          it('should the buttons Update and Reset be enabled', async () => {
            expect(await buttonUpdate.isDisabled()).toBe(false);    
            expect(await buttonReset.isDisabled()).toBe(false); 
            expect(await textInput.getValue()).toBe(""); 
            expect(await findCheckedRadioButton()).toBe("set-off"); 
            expect(component.selectedLogLevel).toBe("set-off");
            expect(loggerComponent.getLogLevel()).toBe(2);
            expect(loggerTestScript.getLogLevel()).toBe(2);
          });
        });
      });
    });

    describe('After check of button "Errors and warnings" and clear text in input field...', () => {

      beforeEach(async () => {
        await radioButtonErrWarn.check();
        await textInput.setValue("");
      });
  
      it('should the buttons Update and Reset be enabled and default values indirect reset', async () => {
        expect(await buttonUpdate.isDisabled()).toBe(true);    
        expect(await buttonReset.isDisabled()).toBe(true); 
        expect(await textInput.getValue()).toBe(""); 
        expect(await findCheckedRadioButton()).toBe("err-warn"); 
        expect(component.selectedLogLevel).toBe("err-warn");
        expect(loggerComponent.getLogLevel()).toBe(2);
        expect(loggerTestScript.getLogLevel()).toBe(2);    
      });
    });

    describe('After check of button "Errors and warnings" and insert a path relevant for both loggers in the input field...', () => {

      beforeEach(async () => {
        await radioButtonErrWarn.check();
        await textInput.setValue("shared/components/log-setting/log-setting.component*");
      });
  
      it('should the buttons Update and Reset be enabled', async () => {
        expect(await buttonUpdate.isDisabled()).toBe(false);    
        expect(await buttonReset.isDisabled()).toBe(false); 
        expect(await textInput.getValue()).toBe("shared/components/log-setting/log-setting.component*"); 
        expect(await findCheckedRadioButton()).toBe("err-warn"); 
        expect(component.selectedLogLevel).toBe("err-warn");
        expect(loggerComponent.getLogLevel()).toBe(2);
        expect(loggerTestScript.getLogLevel()).toBe(2);    
      });
    });
  });

  describe('After insert a path relevant only for component logger in the input field and check of button "Set Off"...', () => {

    beforeEach(async () => {
      await textInput.setValue("shared/components/log-setting/log-setting.component.ts");
      await radioButtonLoggingSetOff.check();
    });

    it('should the buttons Update and Reset be enabled and log level of component logger be 2', async () => {
      expect(await buttonUpdate.isDisabled()).toBe(false);    
      expect(await buttonReset.isDisabled()).toBe(false); 
      expect(await textInput.getValue()).toBe("shared/components/log-setting/log-setting.component.ts"); 
      expect(await findCheckedRadioButton()).toBe("set-off"); 
      expect(component.selectedLogLevel).toBe("set-off");
      expect(loggerComponent.getLogLevel()).toBe(2);
      expect(loggerTestScript.getLogLevel()).toBe(2);
    });

    describe('After click on button "Update"...', () => {

      beforeEach(async () => {
        await buttonUpdate.click();
      });
  
      it('should the button Update be disabled, and the buttons Reset be enabled and log level by component logger be  4', async () => {
        expect(await buttonUpdate.isDisabled()).toBe(true);    
        expect(await buttonReset.isDisabled()).toBe(false); 
        expect(await textInput.getValue()).toBe("shared/components/log-setting/log-setting.component.ts"); 
        expect(await findCheckedRadioButton()).toBe("set-off"); 
        expect(component.selectedLogLevel).toBe("set-off");
        expect(loggerComponent.getLogLevel()).toBe(4);
        expect(loggerTestScript.getLogLevel()).toBe(2);    
      });

      describe('After click on the button Reset ...', () => {

        beforeEach(async () => {
          await buttonReset.click();
        });

        it('default values are set', async () => {     
          expect(await buttonUpdate.isDisabled()).toBe(true);    
          expect(await buttonReset.isDisabled()).toBe(true); 
          expect(await textInput.getValue()).toBe(""); 
          expect(await findCheckedRadioButton()).toBe("err-warn"); 
          expect(component.selectedLogLevel).toBe("err-warn");
          expect(loggerComponent.getLogLevel()).toBe(2);
          expect(loggerTestScript.getLogLevel()).toBe(2);      
          });

          describe('After check of button "Set Off"...', () => {

          beforeEach(async () => {
            await radioButtonLoggingSetOff.check();
          });
      
          it('should the buttons Update and Reset be enabled', async () => {
            expect(await buttonUpdate.isDisabled()).toBe(false);    
            expect(await buttonReset.isDisabled()).toBe(false); 
            expect(await textInput.getValue()).toBe(""); 
            expect(await findCheckedRadioButton()).toBe("set-off"); 
            expect(component.selectedLogLevel).toBe("set-off");
            expect(loggerComponent.getLogLevel()).toBe(2);
            expect(loggerTestScript.getLogLevel()).toBe(2);
          });
        });
      });
    });

    describe('After check of button "Errors and warnings" and clear text in input field...', () => {

      beforeEach(async () => {
        await radioButtonErrWarn.check();
        await textInput.setValue("");
      });
  
      it('should the buttons Update and Reset be enabled and default values indirect reset', async () => {
        expect(await buttonUpdate.isDisabled()).toBe(true);    
        expect(await buttonReset.isDisabled()).toBe(true); 
        expect(await textInput.getValue()).toBe(""); 
        expect(await findCheckedRadioButton()).toBe("err-warn"); 
        expect(component.selectedLogLevel).toBe("err-warn");
        expect(loggerComponent.getLogLevel()).toBe(2);
        expect(loggerTestScript.getLogLevel()).toBe(2);    
      });
    });
  });

});