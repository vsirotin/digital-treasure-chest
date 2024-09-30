import { ILogger } from "./i-logger";
import { ILoggerInfo } from "./i-logger-info";
import { LoggerFactory } from "./logger-factory";

/**
* Logger is a service that provides methods for logging messages to the console.
*
* Recommended usage:
* debug() - Use to technical log. Should be offen called in mostly functions, but rerely switched on in runtime because a lot of output.
* log() - Use to log bussiness logic.
* warn() - Use to log warnings: unexpected situations, but not errors. After this situation application should work correctly.
* error() - Use to log errors: unexpected situations, when application can't work correctly.
*/
export class Log4ts implements ILogger, ILoggerInfo {

  /**
   * Creates a new instance of the Log4ts class.
   * @param logLevel The log level.
   * Log levels are as follows:
   * 0 or negative - All messages are logged. 
   * 1 - Only warning, error, and log messages are logged.
   * 2 - Only warning and error messages are logged. (Default)
   * 3 - Only error messages are logged.
   * 4 or greater - No messages are logged.
   * @param path The path of the source file, inside that logger works or some unic name.
   */
  constructor(private logLevel : number = 2, readonly path: string = "") { }

  //second constructor with only log logLevel parameter:



  /**
   * Sets the log level.
   * @param logLevel
   */
  setLogLevel(logLevel: number) {
    this.logLevel = logLevel;
  }

  /**
   * Gets the current log level.
   * @returns {number} The current log level.
   */
  getLogLevel(): number {
    return this.logLevel;
  }

  /**
  * Logs a stack debug to the console.
  * @param {any[]} args - Information parts for log message.
  */
  debug(...args: any[]) {
    if (this.logLevel <= 0) console.debug(this.generateOutput(args));
  }


  /**
* Logs a message to the console.
* @param {any[]} args - Information parts for log message.
*/
  log(...args: any[]) {
    if (this.logLevel <= 1) console.log(this.generateOutput(args));
  }

  /**
   * Logs a warning message to the console.
   *  @param {any[]} args - Information parts for log message.
  */
  warn(...args: any[]) {
    if (this.logLevel <= 2) console.warn(this.generateOutput(args));
  }

  /**
   * Logs an error message to the console.
   *
   *  @param {any[]} args - Information parts for log message.
  */
  error(...args: any[]) {
    if (this.logLevel <= 3) console.error(this.generateOutput(args));
  }

  private generateOutput(args: any[]): string {
    const prefix = (this.path.length > 0)? this.path + LoggerFactory.defaultPathPostfix : "";
    const t = args.map((arg) => this.convertAragument(arg)).join('');
    return prefix + t;
  }

  private convertAragument(arg: any): string {

    if(arg === undefined) {
      return "undefined";
    }

    if(arg === null) {
      return "null";
    }

    if (typeof arg === 'object') {
      return JSON.stringify(arg);
    }

    return arg;
  }
}


