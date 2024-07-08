export interface ILoggerInfo {
  
    /**
     * Gets the current log level.
     * @returns {number} The current log level.
     */
    getLogLevel(): number;
} 

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

  export interface ILogger extends ILoggerInfo{
    debug(...args: any[]): void; 
  
    /**
     * Logs a message to the console.
     * 
     * @param {string} message - The message to log.
     */
    log(...args: any[]): void; 
  
    /**
     * Logs a warning message to the console.
     * 
     * @param {string} message - The warning message to log.
     */
    warn(...args: any[]): void;
    
    /**
     * Logs an error message to the console.
     * 
     * @param {string} message - The error message to log.
     */
    error(...args: any[]): void;

     /**
     * Sets the log level.
     * @param logLevel 
     */
     setLogLevel(logLevel: number): void;
    
  
  }


  /**
   * LoggerFactory creats and configures loggers.
  */ 
  export class LoggerFactory {

    /**
     * The default path postfix. Used by generating log output.
     */
    public static defaultPathPostfix: string = ': ';

    private static loggers: Map<string, ILogger> = new Map<string, ILogger>();

    /**
     * The default log level.
     * Log levels are as follows:
     * 0 or negative - All messages are logged. (Default)
     * 1 - Only warning, error, and log messages are logged.
     * 2 - Only warning and error messages are logged.
     * 3 - Only error messages are logged.  
     * 4 or greater - No messages are logged.
     * 
     * The log output will be generated as string <path><defaultPathPostfix><message> .
     */
    private static defaultLogLeevl: number = 3;

    /**
     * Get or creates a new logger for given source path.
     * @param path The path of the source file, inside that logger works.
     * @returns {ILogger} The new logger.
     */
    static getLogger(path: string): ILogger {
      let logger = LoggerFactory.loggers.get(path);
      if(logger == null){
        logger = new Logger(path, LoggerFactory.defaultLogLeevl);
        LoggerFactory.loggers.set(path, logger);
      }
      return logger;
    }

    /**
     * Set the default log level.
     * @param logLevel 
     */
    static setDefaultLogLevel(logLevel: number){
      LoggerFactory.defaultLogLeevl = logLevel;
      LoggerFactory.loggers.forEach((logger, path) => {
            logger.setLogLevel(logLevel);
        });
    }

    /**
     * Reset the default log level to 3 and default path postfix to ': '.
     */
    static recetDefaults(){
      LoggerFactory.setDefaultLogLevel(3);
      LoggerFactory.defaultPathPostfix = ': ';
    }

    /**
     * Clear all loggers.
     */
    static clearAllLoggers(){
      LoggerFactory.recetDefaults()
      LoggerFactory.loggers.clear();
    }

    /**
     * Get the default log level.
     * @returns {number} The default log level.
     */
    static getDefaultLogLevel(): number{
        return LoggerFactory.defaultLogLeevl;
    }

    /**
     * Set the log level for all loggers with path that mathc to searchPath.
     * @param searchPath Search path. Can contain * at the begining or at the end.
     * if * at the begining, then searchPath is a substring of path.
     * if * at the end, then path starts with searchPath.
     * else path is equal to searchPath.
     * @param logLevel Log level.
     */
    static setLogLevel(searchPath: string, logLevel: number){
       LoggerFactory.loggers.forEach((logger, path) => {
            if(LoggerFactory.containsPath(searchPath, path)){
                logger.setLogLevel(logLevel);
            }
        });
    }

    private static containsPath(sourcePath: string, path: string): boolean {
        const cFirst = sourcePath.charAt(0);
        if((cFirst == '*') && (sourcePath.length == 1)){
          return true;
      }

        const cLast = sourcePath.charAt(sourcePath.length - 1);

        if((cFirst == '*') && (cLast != '*')){
            const subPath = sourcePath.substring(1, sourcePath.length);
            return path.includes(subPath);
        }

        if((cFirst != '*') && (cLast == '*')){   
            const subPath = sourcePath.substring(0, sourcePath.length - 1);       
            return path.startsWith(subPath);
        }

        if((cFirst == '*') && (cLast == '*')){   
          const subPath = sourcePath.substring(1, sourcePath.length - 1);       
          return path.includes(subPath);
      }

        return path == sourcePath;
    }

  }
    


  /**
 * Logger is a service that provides methods for logging messages to the console.
 * 
 * Recommended usage:
 * debug() - Use to technical log. Should be offen called in mostly functions, but rerely switched on in runtime because a lot of output.
 * log() - Use to log bussiness logic. 
 * warn() - Use to log warnings: unexpected situations, but not errors. After this situation application should work correctly.
 * error() - Use to log errors: unexpected situations, when application can't work correctly.
 */

  class Logger implements ILogger, ILoggerInfo{
  
    /**
     * Creates a new instance of the Logger class.
     * @param path The path of the source file, inside that logger works.
     * @param logLevel The log level.
     * Log levels are as follows:
     * 0 or negative - All messages are logged. (Default)
     * 1 - Only warning, error, and log messages are logged.
     * 2 - Only warning and error messages are logged.
     * 3 - Only error messages are logged.  
     * 4 or greater - No messages are logged.
     */
    constructor(readonly path: string, private logLevel: number) {}
  
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
     * 
     * @param {string} message - The message to include in the stack debug.
     */
    debug(...args: any[]) {
      if(this.logLevel <= 0)console.debug(this.generateOutput(args.join(' ')));
    }
  
    /**
     * Logs a message to the console.
     * 
     * @param {string} message - The message to log.
     */
    log(...args: any[]) {
      if(this.logLevel <= 1)console.log(this.generateOutput(args.join(' ')));
    }
  
    /**
     * Logs a warning message to the console.
     * 
     * @param {string} message - The warning message to log.
     */
    warn(...args: any[]) {
      if(this.logLevel <= 2)console.warn(this.generateOutput(args.join(' ')));
    }
    
    /**
     * Logs an error message to the console.
     * 
     * @param {string} message - The error message to log.
     */
    error(...args: any[]) {
      if(this.logLevel <= 3)console.error(this.generateOutput(args.join(' ')));
    }

    private generateOutput(message: string): string {
      return this.path + LoggerFactory.defaultPathPostfix + message;
    }
  
  }


