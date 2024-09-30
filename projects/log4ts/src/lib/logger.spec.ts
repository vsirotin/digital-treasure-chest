import { LoggerFactory } from './logger-factory';
import { ILogger } from "./i-logger";
import { Log4ts } from './log4ts';

describe('Log4ts', () => {
  let logger1: ILogger;
  let logger2: ILogger;
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
    logger1 = LoggerFactory.getLogger('x/y/z');
    setConsoleSpyies();
  });

  afterEach(() => {
    LoggerFactory.clearAllLoggers();
    resetConsoleSpyies();
  });


  it('should be created', () => {
    expect(logger1).toBeTruthy();
    
  });

  it('by default log level is 2', () => {
    const currentLevel = logger1.getLogLevel();
    expect(currentLevel).toBe(2);
  });

  it('differen type should correct presented separate and in group', () => {
    
    logger1 = new Log4ts();
    logger1.setLogLevel(0);

    const s = 'test';
    logger1.log(s);
    expect(consoleSpyLog).toHaveBeenCalledWith("test");

    const n = 123456789;
    logger1.log(n);
    expect(consoleSpyLog).toHaveBeenCalledWith("123456789");


    const pi = 3.1415927;
    logger1.log(pi);
    expect(consoleSpyLog).toHaveBeenCalledWith("3.1415927");

    const b = true;
    logger1.log(b);
    expect(consoleSpyLog).toHaveBeenCalledWith("true");

    const a = [1, 2, 3];
    logger1.log(a);
    expect(consoleSpyLog).toHaveBeenCalledWith("[1,2,3]");

    const o = {a: 1, b: 2, c: 3};
    logger1.log(o);
    expect(consoleSpyLog).toHaveBeenCalledWith('{"a":1,"b":2,"c":3}'); 

    const f = function(a: number, b: number) { return a + b; };
    logger1.log(f);
    const expectation1 = f.toString(); 
    expect(consoleSpyLog).toHaveBeenCalledWith(expectation1);

    const u = undefined; 
    logger1.log(u);
    expect(consoleSpyLog).toHaveBeenCalledWith("undefined");

    const nll = null; 
    logger1.log(nll);
    expect(consoleSpyLog).toHaveBeenCalledWith("null");

    logger1.log(s, n, pi, b, a, o, f, u, nll);
    const expectation2 = 'test1234567893.1415927true[1,2,3]{"a":1,"b":2,"c":3}' + expectation1 + 'undefinednull';
    expect(consoleSpyLog).toHaveBeenCalledWith(expectation2); 

    class A {
      a1 = 1;
      b1 = "blabla";
      c1 = o;
    }

    const ob = new A();
    logger1.log(ob);
    expect(consoleSpyLog).toHaveBeenCalledWith('{"a1":1,"b1":"blabla","c1":{"a":1,"b":2,"c":3}}');

  });

  it('by naive using (without factoty) only warnings and errors should be logged', () => {
    logger1 = new Log4ts();
    logger1.log('test');
    expect(consoleSpyLog).not.toHaveBeenCalled();
    
    logger1.warn('test'); 
    expect(consoleSpyWarn).toHaveBeenCalled();

    logger1.error('test');
    expect(consoleSpyError).toHaveBeenCalledWith('test');

    logger1.debug('test');
    expect(consoleSpyDebug).not.toHaveBeenCalled();

  });

  it('by naive using with level 0  all levels should be logged (using parameter in constructor)', () => {
    logger1 = new Log4ts(0);
    logger1.log('test');
    expect(consoleSpyLog).toHaveBeenCalled();
    
    logger1.warn('test'); 
    expect(consoleSpyWarn).toHaveBeenCalled();

    logger1.error('test');
    expect(consoleSpyError).toHaveBeenCalled();

    logger1.debug('test');
    expect(consoleSpyDebug).toHaveBeenCalled();

  });

  it('by naive using with level 0  all levels should be logged (usinf setLogLevel)', () => {
    logger1 = new Log4ts();
    logger1.setLogLevel(0);
    logger1.log('test');
    expect(consoleSpyLog).toHaveBeenCalled();
    
    logger1.warn('test'); 
    expect(consoleSpyWarn).toHaveBeenCalled();

    logger1.error('test');
    expect(consoleSpyError).toHaveBeenCalled();

    logger1.debug('test');
    expect(consoleSpyDebug).toHaveBeenCalled();

  });

  it('by default only warnings and errors should be logged', () => {
    logger1.log('test');
    expect(consoleSpyLog).not.toHaveBeenCalled();
    
    logger1.warn('test'); 
    expect(consoleSpyWarn).toHaveBeenCalled();

    logger1.error('test');
    expect(consoleSpyError).toHaveBeenCalledWith('x/y/z: test');

    logger1.debug('test');
    expect(consoleSpyDebug).not.toHaveBeenCalled();

  });

  it('by level 5 no levels should be logged', () => {
    logger1.setLogLevel(5);
    logger1.log('test');
    expect(consoleSpyLog).not.toHaveBeenCalled();
    
    logger1.warn('test'); 
    expect(consoleSpyWarn).not.toHaveBeenCalled();

    logger1.error('test');
    expect(consoleSpyError).not.toHaveBeenCalled();

    logger1.debug('test');
    expect(consoleSpyDebug).not.toHaveBeenCalled();

  });

  it('by level 20 no levels should be logged', () => {
    logger1.setLogLevel(20);
    logger1.log('test');
    expect(consoleSpyLog).not.toHaveBeenCalled();
    
    logger1.warn('test'); 
    expect(consoleSpyWarn).not.toHaveBeenCalled();

    logger1.error('test');
    expect(consoleSpyError).not.toHaveBeenCalled();

    logger1.debug('test');
    expect(consoleSpyDebug).not.toHaveBeenCalled();

  });

  it('by level 0  all levels should be logged', () => {
    logger1.setLogLevel(0);
    logger1.log('test');
    expect(consoleSpyLog).toHaveBeenCalled();
    
    logger1.warn('test'); 
    expect(consoleSpyWarn).toHaveBeenCalled();

    logger1.error('test');
    expect(consoleSpyError).toHaveBeenCalled();

    logger1.debug('test');
    expect(consoleSpyDebug).toHaveBeenCalled();

  });

  it('by level -3  all levels should be logged', () => {
    logger1.setLogLevel(-3);
    logger1.log('test');
    expect(consoleSpyLog).toHaveBeenCalled();
    
    logger1.warn('test'); 
    expect(consoleSpyWarn).toHaveBeenCalled();

    logger1.error('test');
    expect(consoleSpyError).toHaveBeenCalled();

    logger1.debug('test');
    expect(consoleSpyDebug).toHaveBeenCalled();

  });

  it('by level 3  only errors should be logged', () => {
    logger1.setLogLevel(3);

    logger1.debug('test');
    expect(consoleSpyDebug).not.toHaveBeenCalled();

    logger1.log('test');
    expect(consoleSpyLog).not.toHaveBeenCalled();
    
    logger1.warn('test'); 
    expect(consoleSpyWarn).not.toHaveBeenCalled();

    logger1.error('test');
    expect(consoleSpyError).toHaveBeenCalled();

  });

  it('by level 2  only errors and warnings should be logged', () => {
    logger1.setLogLevel(2);

    logger1.debug('test');
    expect(consoleSpyDebug).not.toHaveBeenCalled();

    logger1.log('test');
    expect(consoleSpyLog).not.toHaveBeenCalled();
    
    logger1.warn('test'); 
    expect(consoleSpyWarn).toHaveBeenCalled();

    logger1.error('test');
    expect(consoleSpyError).toHaveBeenCalled();

  });

  it('by level 1  errors, warnings and log should be logged', () => {
    logger1.setLogLevel(1);

    logger1.debug('test');
    expect(consoleSpyDebug).not.toHaveBeenCalled();

    logger1.log('test');
    expect(consoleSpyLog).toHaveBeenCalled();
    
    logger1.warn('test'); 
    expect(consoleSpyWarn).toHaveBeenCalled();

    logger1.error('test');
    expect(consoleSpyError).toHaveBeenCalled();

  });

  it('by changing of log level in runtime correct behaviour', () => {
    logger1.setLogLevel(2);

    logger1.debug('test');
    expect(consoleSpyDebug).not.toHaveBeenCalled();

    logger1.log('test');
    expect(consoleSpyLog).not.toHaveBeenCalled();
    
    logger1.warn('test'); 
    expect(consoleSpyWarn).toHaveBeenCalled();

    logger1.error('test');
    expect(consoleSpyError).toHaveBeenCalled();

    let currentLevel = logger1.getLogLevel();
    expect(currentLevel).toBe(2);

    logger1.setLogLevel(1);
    logger1.debug('test');
    expect(consoleSpyDebug).not.toHaveBeenCalled();

    logger1.log('test');
    expect(consoleSpyLog).toHaveBeenCalled();
    
    logger1.warn('test'); 
    expect(consoleSpyWarn).toHaveBeenCalled();

    logger1.error('test');
    expect(consoleSpyError).toHaveBeenCalled();

    currentLevel = logger1.getLogLevel();
    expect(currentLevel).toBe(1);

  });

  it('by changing of log level in runtime correct behaviour', () => {
    logger1.setLogLevel(2);

    logger1.debug('test');
    expect(consoleSpyDebug).not.toHaveBeenCalled();
  }); 

  it('by changing of default path postfix in runtime correct behaviour', () => {
    logger1.setLogLevel(2);

    logger1.debug('test');
    expect(consoleSpyDebug).not.toHaveBeenCalled();

    LoggerFactory.defaultPathPostfix = '- ';
    logger1.debug('test');
    expect(consoleSpyDebug).not.toHaveBeenCalled();
  });

  it('by changing of log level with factory  in runtime correct behaviour', () => {
    // The table below means:
    // Rows: path by logger creation
    // Collumns: path by setLogLevel. It set log lvel by all loggers with path that mathc to searchPath.
    // Cell: '+' logger make output after setLogger, '-' not.
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
    expect(consoleSpyWarn).toHaveBeenCalled();
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

  describe('By using two loggers...', () => {

    beforeEach(() => {
      logger2 = LoggerFactory.getLogger('x/y/a');
    });

    it('common for both loggers path works correct...', () => {
      LoggerFactory.setLogLevel('x/y/*', 3);
      expect(logger1.getLogLevel()).toBe(3);
      expect(logger2.getLogLevel()).toBe(3); 
    });

    it('relevant only for first path works correct...', () => {
      LoggerFactory.setLogLevel('x/y/a', 3);
      expect(logger1.getLogLevel()).toBe(2);
      expect(logger2.getLogLevel()).toBe(3); 
    });

    it('relevant only for second path works correct...', () => {
      LoggerFactory.setLogLevel('x/y/z', 3);
      expect(logger1.getLogLevel()).toBe(3);
      expect(logger2.getLogLevel()).toBe(2); 
    });

  });
});
