import { ILoggerInfo } from "./i-logger-info";

/**
 * Logger is a service that provides methods for logging messages to the console.
 *
 * Recommended usage:
 * debug() - Use to technical log. Should be offen called in mostly functions, but rerely switched on in runtime because a lot of output.
 * log() - Use to log bussiness logic.
 * warn() - Use to log warnings: unexpected situations, but not errors. After this situation application should work correctly.
 * error() - Use to log errors: unexpected situations, when application can't work correctly.
 *
 * The log output will be generated as string <path><blanc symbol><message> .
 */

export interface ILogger extends ILoggerInfo {

  /**
    * Logs a debug info to the console.
    * @param {any[]} args - Information parts for log message.
    */
  debug(...args: any[]): void;

  /**
    * Logs a message to the console.
    * @param {any[]} args - Information parts for log message.
    */
  log(...args: any[]): void;

  /**
    * Logs a warning message to the console.
    * @param {any[]} args - Information parts for log message.
    */
  warn(...args: any[]): void;

  /**
    * Logs an error message to the console.
    * @param {any[]} args - Information parts for log message.
    */
  error(...args: any[]): void;

  /**
  * Sets the log level.
  * @param logLevel
  * Log levels are as follows:
  * 0 or negative - All messages are logged. 
  * 1 - Only warning, error, and log messages are logged.
  * 2 - Only warning and error messages are logged. (Default)
  * 3 - Only error messages are logged. 
  * 4 or greater - No messages are logged.
  */
  setLogLevel(logLevel: number): void;

  /**
   * Sets the log level for logging of only errors.
   */
  setErrorLevel(): void;

  /**
   * Sets the log level for logging of only warnings and errors.
   */
  setDefaultLevel(): void;

  /**
   * Sets the log level for types of logging.
   */
  setAllLevels(): void;

  /**
   * Sets mode where no log output happens.
   */
  setNoLogging(): void;
}

export abstract class BaseLogger implements ILogger {
  abstract warn(...args: any[]): void;
  abstract error(...args: any[]): void;
  abstract debug(...args: any[]): void;
  abstract log(...args: any[]): void;
  abstract getLogLevel(): number;
  abstract setLogLevel(logLevel: number): void;

  /**
   * Sets the log level for logging of only errors.
   */
  setErrorLevel(): void {
    this.setLogLevel(3);
  }

  /**
   * Sets the log level for logging of only warnings and errors.
   */
  setDefaultLevel(): void {
    this.setLogLevel(2);
  }

  /**
   * Sets the log level for types of logging.
   */
  setAllLevels(): void {
    this.setLogLevel(0);
  }

  /**
   * Sets mode where no log output happens.
   */
  setNoLogging(): void {
    this.setLogLevel(4);
  }
}


