import { LoggerFactory } from './logger-factory';
import { ILogger } from './i-logger';
import { Log4ts } from './log4ts';

describe('LoggerFactory', () => {
  let logger: ILogger;

  beforeEach(() => {
    LoggerFactory.clearAllLoggers();
  });

  afterEach(() => {
    LoggerFactory.clearAllLoggers();
  });

  it('should create a new logger', () => {
    logger = LoggerFactory.getLogger('test/path');
    expect(logger).toBeTruthy();
    expect(logger).toBeInstanceOf(Log4ts);
  });

  it('should return the same logger for the same path', () => {
    const logger1 = LoggerFactory.getLogger('test/path');
    const logger2 = LoggerFactory.getLogger('test/path');
    expect(logger1).toBe(logger2);
  });

  it('should set the default log level', () => {
    LoggerFactory.setLogLevelsByAllLoggers(1);
    logger = LoggerFactory.getLogger('test/path');
    expect(logger.getLogLevel()).toBe(1);
  });

  it('should reset the default log level and path postfix', () => {
    LoggerFactory.setLogLevelsByAllLoggers(1);
    LoggerFactory.defaultPathPostfix = '- ';
    LoggerFactory.setDefaultLoggerConfig();
    logger = LoggerFactory.getLogger('test/path');
    expect(logger.getLogLevel()).toBe(2); // Default log level is 2
    expect(LoggerFactory.defaultPathPostfix).toBe(': ');
  });

  it('should clear all loggers', () => {
    logger = LoggerFactory.getLogger('test/path');
    expect(LoggerFactory['loggers'].size).toBe(1);
    LoggerFactory.clearAllLoggers();
    expect(LoggerFactory['loggers'].size).toBe(0);
  });

  it('should get the default log level', () => {
    expect(LoggerFactory.getDefaultLogLevel()).toBe(2); // Default log level is 2
  });

  it('should set the log level for loggers matching the search path', () => {
    const logger1 = LoggerFactory.getLogger('a/b/c');
    const logger2 = LoggerFactory.getLogger('a/d/c');
    const logger3 = LoggerFactory.getLogger('e/b/c');

    LoggerFactory.setLogLevel('*b/c', 0);
    expect(logger1.getLogLevel()).toBe(0);
    expect(logger2.getLogLevel()).toBe(2); // Default log level
    expect(logger3.getLogLevel()).toBe(0);
  });

  it('should contain path correctly', () => {
    expect(LoggerFactory['containsPath']('*b/c', 'a/b/c')).toBe(true);
    expect(LoggerFactory['containsPath']('a*', 'a/b/c')).toBe(true);
    expect(LoggerFactory['containsPath']('*b*', 'a/b/c')).toBe(true);
    expect(LoggerFactory['containsPath']('e/b/c', 'e/b/c')).toBe(true);
    expect(LoggerFactory['containsPath']('x/y/z', 'a/b/c')).toBe(false);
  });
  
  describe('Special setting functions...', () => {

    let logger1: ILogger;
    let logger2: ILogger;

    beforeEach(() => {
      logger1 = LoggerFactory.getLogger('test/path1');
      logger2 = LoggerFactory.getLogger('test/path2');
    });

    it('should set log level to only errors for all loggers', () => {
      LoggerFactory.setErrorLevelByAllLoggers();
      expect(logger1.getLogLevel()).toBe(3);
      expect(logger2.getLogLevel()).toBe(3);
    });

    it('should set log level to warnings and errors for all loggers', () => {
      LoggerFactory.setDefaultLevelByAllLoggers();
      expect(logger1.getLogLevel()).toBe(2);
      expect(logger2.getLogLevel()).toBe(2);
    });

    it('should set log level to all types of logging for all loggers', () => {
      LoggerFactory.setAllLevelsByAllLoggers();
      expect(logger1.getLogLevel()).toBe(0);
      expect(logger2.getLogLevel()).toBe(0);
    });

    it('should set log level to no logging for all loggers', () => {
      LoggerFactory.setNoLoggingByAllLoggers();
      expect(logger1.getLogLevel()).toBe(4);
      expect(logger2.getLogLevel()).toBe(4);
    });
  });

  
});