import { ILogger } from "./i-logger";
import { Log4ts } from "./log4ts";

const DEFAULT_LOG_LEVEL = 2;
const DEFAULT_PATH_POSTFIX = ': ';

  /**
   * LoggerFactory creats and configures loggers.
  */ 
  export class LoggerFactory {

   

    /**
     * The default path postfix. Used by generating log output.
     */
    public static defaultPathPostfix: string = DEFAULT_PATH_POSTFIX;

    private static loggers: Map<string, ILogger> = new Map<string, ILogger>();

    /**
     * The default log level.
     * Log levels are as follows:
     * 0 or negative - All messages are logged. 
     * 1 - Only warning, error, and log messages are logged.
     * 2 - Only warning and error messages are logged. (Default)
     * 3 - Only error messages are logged.  
     * 4 or greater - No messages are logged.
     * 
     * The log output will be generated as string <path><defaultPathPostfix><message> .
     */
    private static defaultLogLeevl: number = DEFAULT_LOG_LEVEL;

    /**
     * Get or creates a new logger for given source path.
     * @param path The path of the source file, inside that logger works.
     * @returns {ILogger} The new logger.
     */
    static getLogger(path: string): ILogger {
      let logger = LoggerFactory.loggers.get(path);
      if(logger == null){
        logger = new Log4ts(LoggerFactory.defaultLogLeevl, path);
        LoggerFactory.loggers.set(path, logger);
      }
      return logger;
    }

    /**
     * Set the default log level.
     * @param logLevel  Log levels are as follows:
     * 0 or negative - All messages are logged. 
     * 1 - Only warning, error, and log messages are logged.
     * 2 - Only warning and error messages are logged. (Default)
     * 3 - Only error messages are logged.  
     * 4 or greater - No messages are logged.
     */
    static setLogLevelsByAllLoggers(logLevel: number){
      LoggerFactory.defaultLogLeevl = logLevel;
      LoggerFactory.loggers.forEach((logger, path) => {
            logger.setLogLevel(logLevel);
        });
    }

    /**
     * Sets the log level for logging of only errors by all loggers.
     */
    static setErrorLevelByAllLoggers(): void {
      LoggerFactory.setLogLevelsByAllLoggers(3);
    }

    /**
     * Sets the log level for logging of only warnings and errors by all loggers.
     */
    static setDefaultLevelByAllLoggers(): void {
      LoggerFactory.setLogLevelsByAllLoggers(2);
    }

    /**
     * Sets the log level for types of logging by all loggers.
     */
    static setAllLevelsByAllLoggers(): void {
      LoggerFactory.setLogLevelsByAllLoggers(0);
    }

    /**
     * Sets mode where no log output happens by all loggers.
     */
    static setNoLoggingByAllLoggers(): void {
      LoggerFactory.setLogLevelsByAllLoggers(4);
    }

    /**
     * Reset the default log level to 2 and default path postfix to ': '.
     */
    static setDefaultLoggerConfig(){
      LoggerFactory.setLogLevelsByAllLoggers(DEFAULT_LOG_LEVEL);
      LoggerFactory.defaultPathPostfix = DEFAULT_PATH_POSTFIX;
    }

    /**
     * Clear all loggers.
     */
    static clearAllLoggers(){
      LoggerFactory.setDefaultLoggerConfig()
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

    /** 
      * Check if the path contains the source path.
      * @param sourcePath The source path.
      * @param path The path to check.
      * @returns {boolean} True if the path contains the source path.
    */
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

