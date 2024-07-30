import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';

const DEFAULT_LOG_LEVEL = new Map<string, string>( [
  ["set-off", "Loggin set off"], 
  ["only-errors", "Only errrors"],
  ["err-warn", "Errors and warnings"], 
  ["err-log", "Errors, warnings and logs"], 
  ["err-debug", "Errors, warnings, logs and debug"]
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
    templateFieldName: "Logged file name(s) or template",
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

  logger: ILogger = LoggerFactory.getLogger("LogSettingComponent");

  logLevels : { key: string, value: string }[] = Array.from(DEFAULT_LOG_LEVEL, ([key, value]) => ({ key, value }));

  constructor() {
    this.logger.log("LogSettingComponent created");
    this.resetInitialValues();
    this.updateButtons();
  }


  onDebugLevelChange(event: any) {
    this.selectedLogLevel = event.value;
    this.logger.log("selectedLogLevel: " + this.selectedLogLevel);
    this.updateButtons();
  }

  onInput($event: Event) {
    this.updateButtons();
  }

  onUpdate() {
    this.logger.log("start of onUpdate");
    this.oldFileNameTemplate = this.fileNameTemplate;
    this.oldSelectedLogLevel = this.selectedLogLevel;
    this.updateButtons();

    //find out the index of the selected log level
    const logLevel = this.logLevels.findIndex((logLevel) => logLevel.key === this.selectedLogLevel);
    console.log("logLevel: " + logLevel);
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
  }
  
  private resetInitialValues() {
    this.logger.log("Start of esetting initial values");
    this.oldFileNameTemplate = this.initialFileNameTemplate;
    this.oldSelectedLogLevel = this.initialLogLevel;

    this.fileNameTemplate = this.initialFileNameTemplate;
    this.selectedLogLevel = this.initialLogLevel;
  }

  private updateButtons() {
    this.isUpdateDisabled =
      this.fileNameTemplate === this.oldFileNameTemplate &&
      this.selectedLogLevel === this.oldSelectedLogLevel;

    this.isResetDisabled =
      this.fileNameTemplate === this.initialFileNameTemplate &&
      this.selectedLogLevel === this.initialLogLevel;
  }
}
