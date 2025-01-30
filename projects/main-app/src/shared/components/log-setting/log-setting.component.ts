import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';

const DEFAULT_LOG_LEVEL = new Map<string, string>( [
  ["err-debug", "Errors, warnings, logs and debug"],
  ["err-log", "Errors, warnings and logs"], 
  ["err-warn", "Errors and warnings"],
  ["only-errors", "Only errrors"],
  ["set-off", "Logging set off"], 
  ]);

@Component({
  selector: 'app-log-setting',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatRadioModule,
    MatDividerModule,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: './log-setting.component.html',
  styleUrl: './log-setting.component.css'
})
export class LogSettingComponent {

  ui = {
    logLevelSetInvitation: "Set the logging level",
    templateFieldName: "Logged file name(s) or name pattern",
    templateHelpText: "e.g. */log*",
    labelUpdate: "Update",
    labelReset: "Reset",
  }

  // Initial values
  initialFileNameTemplate = '';
  initialLogLevel = 'err-warn';


  isUpdateDisabled = true;
  isResetDisabled = true;

  oldFileNameTemplate = this.initialFileNameTemplate;
  oldSelectedLogLevel = this.initialLogLevel

  fileNameTemplate = this.initialFileNameTemplate;
  selectedLogLevel = this.initialLogLevel

  logger: ILogger = LoggerFactory.getLogger("eu.sirotin.demo-app.shared/components/log-setting/log-setting.component.ts");

  logLevels : { key: string, value: string }[] = Array.from(DEFAULT_LOG_LEVEL, ([key, value]) => ({ key, value }));

  constructor() {
    this.logger.log("LogSettingComponent created");
    this.resetInitialValues();
    this.updateButtons();
  }


  onDebugLevelChange(event: any) {
    this.logger.debug("onDebugLevelChange: " + event);
    this.selectedLogLevel = event.value;
    this.logger.log("selectedLogLevel: " + this.selectedLogLevel);
    this.updateButtons();
  }

  onInput($event: Event) {
    
    let message = "";
    const currentTarget = $event?.currentTarget as HTMLElement | null;

    if(currentTarget) {
      if ('inputType' in $event) {
        const inputType = ($event as { inputType: string }).inputType;
        message += " inputType=" + inputType;
      }

      if ( 'data' in $event) {
        const data = ($event as { data: string }).data;
        message +=  " data=" + data;
      }
    }

    this.logger.debug("onInput: ", message);
    
    this.updateButtons();
  }

  onUpdate() {
    this.logger.log("start of onUpdate");
    this.oldFileNameTemplate = this.fileNameTemplate;
    this.oldSelectedLogLevel = this.selectedLogLevel;
    this.updateButtons();

    //find out the index of the selected log level
    const logLevel = this.logLevels.findIndex((logLevel) => logLevel.key === this.selectedLogLevel);
    this.logger.log("in onUpdate logLevel: " + logLevel);
    if(this.fileNameTemplate.length > 0) {
      LoggerFactory.setLogLevel(this.fileNameTemplate, logLevel);
      return;
    }
    LoggerFactory.setLogLevelsByAllLoggers(logLevel);
  }

  onReset() {
    this.logger.log("start of onReset");
    this.resetInitialValues();
    this.updateButtons();
    LoggerFactory.setDefaultLoggerConfig();
  }
  
  private resetInitialValues() {
    this.logger.debug("start of resetInitialValues");
    this.oldFileNameTemplate = this.initialFileNameTemplate;
    this.oldSelectedLogLevel = this.initialLogLevel;

    this.fileNameTemplate = this.initialFileNameTemplate;
    this.selectedLogLevel = this.initialLogLevel;
  }

  private updateButtons() {
    this.logger.debug("start of updateButtons");
    this.isUpdateDisabled =
      this.fileNameTemplate === this.oldFileNameTemplate &&
      this.selectedLogLevel === this.oldSelectedLogLevel;

    this.isResetDisabled =
      this.fileNameTemplate === this.initialFileNameTemplate &&
      this.selectedLogLevel === this.initialLogLevel;
  }
}
