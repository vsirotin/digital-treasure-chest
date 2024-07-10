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
  */
  setLogLevel(logLevel: number): void;
}
