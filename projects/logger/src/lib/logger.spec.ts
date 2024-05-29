import { LoggerFactory, ILogger } from './logger';

describe('Logger', () => {
  let logger: ILogger;
  let consoleSpyLog: jasmine.Spy;
  let consoleSpyWarn: jasmine.Spy;
  let consoleSpyError: jasmine.Spy;
  let consoleSpyDebug: jasmine.Spy;


  function setConsoleSpyies() {
    consoleSpyLog = spyOn(console, 'log');
    consoleSpyWarn = spyOn(console, 'warn');
    consoleSpyError = spyOn(console, 'error');
    consoleSpyDebug = spyOn(console, 'debug');
  }

  function resetConsoleSpyies() {
    consoleSpyLog.calls.reset();
    consoleSpyWarn.calls.reset();
    consoleSpyError.calls.reset();
    consoleSpyDebug.calls.reset();
  }

  function refresghConsoleSpyies(){
    resetConsoleSpyies();
    setConsoleSpyies();
  }

  beforeEach(() => {
    logger = LoggerFactory.getLogger('x/y/z');
    setConsoleSpyies();
  });

  afterEach(() => {
    LoggerFactory.clearAllLoggers();
    resetConsoleSpyies();
  });


  it('should be created', () => {
    expect(logger).toBeTruthy();
  });

  it('by default log level is 3', () => {
    const currentLevel = logger.getLogLevel();
    expect(currentLevel).toBe(3);
  });

  it('by default only errors should be logged', () => {
    logger.log('test');
    expect(consoleSpyLog).not.toHaveBeenCalled();
    
    logger.warn('test'); 
    expect(consoleSpyWarn).not.toHaveBeenCalled();

    logger.error('test');
    expect(consoleSpyError).toHaveBeenCalledWith('x/y/z: test');

    logger.debug('test');
    expect(consoleSpyDebug).not.toHaveBeenCalled();

  });

  it('by level 5 no levels should be logged', () => {
    logger.setLogLevel(5);
    logger.log('test');
    expect(consoleSpyLog).not.toHaveBeenCalled();
    
    logger.warn('test'); 
    expect(consoleSpyWarn).not.toHaveBeenCalled();

    logger.error('test');
    expect(consoleSpyError).not.toHaveBeenCalled();

    logger.debug('test');
    expect(consoleSpyDebug).not.toHaveBeenCalled();

  });

  it('by level 20 no levels should be logged', () => {
    logger.setLogLevel(20);
    logger.log('test');
    expect(consoleSpyLog).not.toHaveBeenCalled();
    
    logger.warn('test'); 
    expect(consoleSpyWarn).not.toHaveBeenCalled();

    logger.error('test');
    expect(consoleSpyError).not.toHaveBeenCalled();

    logger.debug('test');
    expect(consoleSpyDebug).not.toHaveBeenCalled();

  });

  it('by level 0  all levels should be logged', () => {
    logger.setLogLevel(0);
    logger.log('test');
    expect(consoleSpyLog).toHaveBeenCalled();
    
    logger.warn('test'); 
    expect(consoleSpyWarn).toHaveBeenCalled();

    logger.error('test');
    expect(consoleSpyError).toHaveBeenCalled();

    logger.debug('test');
    expect(consoleSpyDebug).toHaveBeenCalled();

  });

  it('by level -3  all levels should be logged', () => {
    logger.setLogLevel(-3);
    logger.log('test');
    expect(consoleSpyLog).toHaveBeenCalled();
    
    logger.warn('test'); 
    expect(consoleSpyWarn).toHaveBeenCalled();

    logger.error('test');
    expect(consoleSpyError).toHaveBeenCalled();

    logger.debug('test');
    expect(consoleSpyDebug).toHaveBeenCalled();

  });

  it('by level 3  only errors should be logged', () => {
    logger.setLogLevel(3);

    logger.debug('test');
    expect(consoleSpyDebug).not.toHaveBeenCalled();

    logger.log('test');
    expect(consoleSpyLog).not.toHaveBeenCalled();
    
    logger.warn('test'); 
    expect(consoleSpyWarn).not.toHaveBeenCalled();

    logger.error('test');
    expect(consoleSpyError).toHaveBeenCalled();

  });

  it('by level 2  only errors and warnings should be logged', () => {
    logger.setLogLevel(2);

    logger.debug('test');
    expect(consoleSpyDebug).not.toHaveBeenCalled();

    logger.log('test');
    expect(consoleSpyLog).not.toHaveBeenCalled();
    
    logger.warn('test'); 
    expect(consoleSpyWarn).toHaveBeenCalled();

    logger.error('test');
    expect(consoleSpyError).toHaveBeenCalled();

  });

  it('by level 1  errors, warnings and log should be logged', () => {
    logger.setLogLevel(1);

    logger.debug('test');
    expect(consoleSpyDebug).not.toHaveBeenCalled();

    logger.log('test');
    expect(consoleSpyLog).toHaveBeenCalled();
    
    logger.warn('test'); 
    expect(consoleSpyWarn).toHaveBeenCalled();

    logger.error('test');
    expect(consoleSpyError).toHaveBeenCalled();

  });

  it('by changing of log level in runtime correct behaviour', () => {
    logger.setLogLevel(2);

    logger.debug('test');
    expect(consoleSpyDebug).not.toHaveBeenCalled();

    logger.log('test');
    expect(consoleSpyLog).not.toHaveBeenCalled();
    
    logger.warn('test'); 
    expect(consoleSpyWarn).toHaveBeenCalled();

    logger.error('test');
    expect(consoleSpyError).toHaveBeenCalled();

    let currentLevel = logger.getLogLevel();
    expect(currentLevel).toBe(2);

    logger.setLogLevel(1);
    logger.debug('test');
    expect(consoleSpyDebug).not.toHaveBeenCalled();

    logger.log('test');
    expect(consoleSpyLog).toHaveBeenCalled();
    
    logger.warn('test'); 
    expect(consoleSpyWarn).toHaveBeenCalled();

    logger.error('test');
    expect(consoleSpyError).toHaveBeenCalled();

    currentLevel = logger.getLogLevel();
    expect(currentLevel).toBe(1);

  });

  it('by changing of log level in runtime correct behaviour', () => {
    logger.setLogLevel(2);

    logger.debug('test');
    expect(consoleSpyDebug).not.toHaveBeenCalled();
  }); 

  it('by changing of default path postfix in runtime correct behaviour', () => {
    logger.setLogLevel(2);

    logger.debug('test');
    expect(consoleSpyDebug).not.toHaveBeenCalled();

    LoggerFactory.defaultPathPostfix = '- ';
    logger.debug('test');
    expect(consoleSpyDebug).not.toHaveBeenCalled();
  });

  it('by changing of log level with factory  in runtime correct behaviour', () => {

    // Expected behaviout by tests below:
    //--------------------------------------------
    // path |*b/c | a* | *b* | e/b/c | x/y/z | * |
    //--------------------------------------------
    // a/b/c|  +  |  + |  +  |   -   |  -    | + |
    // a/d/c|  -  |  + |  +  |   -   |  -    | + |
    // e/b/c|  +  |  - |  +  |   -   |  -    | + |
    //--------------------------------------------
    let loggerABC = LoggerFactory.getLogger('a/b/c');
    let loggerADC = LoggerFactory.getLogger('a/d/c');
    let loggerEBC = LoggerFactory.getLogger('e/b/c');

    loggerABC.debug('test');
    expect(consoleSpyDebug).not.toHaveBeenCalled();
    loggerADC.debug('test');
    expect(consoleSpyDebug).not.toHaveBeenCalled();
    loggerEBC.debug('test');
    expect(consoleSpyDebug).not.toHaveBeenCalled();;

    // Collumn 2 in test table above
    LoggerFactory.setLogLevel('*b/c', 0);
    loggerABC.debug('test');
    expect(consoleSpyDebug).toHaveBeenCalled();
    loggerADC.log('test');
    expect(consoleSpyLog).not.toHaveBeenCalled();
    loggerEBC.warn('test');
    expect(consoleSpyWarn).toHaveBeenCalled();
    resetConsoleSpyies();
    LoggerFactory.recetDefaults();

    // Collumn 3 in test table above
    LoggerFactory.setLogLevel('a*', 0);
    loggerABC.debug('test');
    expect(consoleSpyDebug).toHaveBeenCalled();
    loggerADC.log('test');
    expect(consoleSpyLog).toHaveBeenCalled();
    loggerEBC.warn('test');
    expect(consoleSpyWarn).not.toHaveBeenCalled();
    resetConsoleSpyies();
    LoggerFactory.recetDefaults();

    // Collumn 4 in test table above
    LoggerFactory.setLogLevel('*b*', 0);
    loggerABC.debug('test');
    expect(consoleSpyDebug).toHaveBeenCalled();
    loggerADC.log('test');
    expect(consoleSpyLog).not.toHaveBeenCalled();
    loggerEBC.warn('test');
    expect(consoleSpyWarn).toHaveBeenCalled();
    resetConsoleSpyies();
    LoggerFactory.recetDefaults();

    // Collumn 5 in test table above
    LoggerFactory.setLogLevel('e/b/c', 0);
    loggerABC.debug('test');
    expect(consoleSpyDebug).not.toHaveBeenCalled();
    loggerADC.log('test');
    expect(consoleSpyLog).not.toHaveBeenCalled();
    loggerEBC.warn('test');
    expect(consoleSpyWarn).toHaveBeenCalled();
    resetConsoleSpyies();
    LoggerFactory.recetDefaults();


    // Collumn 5 in test table above
    LoggerFactory.setLogLevel('*', 0);
    loggerABC.debug('test');
    expect(consoleSpyDebug).toHaveBeenCalled();
    loggerADC.log('test');
    expect(consoleSpyLog).toHaveBeenCalled();
    loggerEBC.warn('test');
    expect(consoleSpyWarn).toHaveBeenCalled();
    resetConsoleSpyies();
    LoggerFactory.recetDefaults();
  });
});
