import { Component } from '@angular/core';
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

  isUpdateDisabled = true;
  isResetDisabled = false
  fileNameTemplate = "";

  logger: ILogger = LoggerFactory.getLogger("LogSettingComponent");

  logLevels : { key: string, value: string }[] = Array.from(DEFAULT_LOG_LEVEL, ([key, value]) => ({ key, value }));

  selectedLogLevel: string = this.logLevels[2].key;

  onDebugLevelChange(event: any) {
    const selectedSeason = event.value;
    this.logger.error(`Selected season: ${selectedSeason}`);
  }

}
