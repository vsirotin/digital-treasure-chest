# Log4ts

[![GitHub license](https://img.shields.io/badge/license-Apache%20License%202.0-blue.svg?style=flat)](https://www.apache.org/licenses/LICENSE-2.0)

[![npm](https://img.shields.io/npm/v/@vsirotin/log4ts?sort=semver&logo=npm)](https://www.npmjs.com/package/@vsirotin/log4ts)
[![npm type definitions](https://img.shields.io/npm/types/v-github-icon?logo=typescript)](https://github.com/vinayakkulkarni/v-github-icon/blob/main/package.json)

[![npm](https://img.shields.io/npm/dt/@vsirotin/log4ts?logo=npm)](http://npm-stat.com/charts.html?package=@vsirotin/log4ts)
[![npm](https://img.shields.io/npm/dw/@vsirotin/log4ts?logo=npm)](http://npm-stat.com/charts.html?package=@vsirotin/log4ts)


The Log4ts library is inspiared by famous logging library Log4J. It makes it easy and more convenient than browser's console a output data about the operation of your TypeScript (e.g. Angular or Node.js) application to the browser console and enables dynamically managing this output in real time.

One more thing is important to note. Although the library is inspired by the ideas of Log4J, it does not replicate its giant capabilities, but is a very lightweight add-on over the browser console, allowing you to manage the output on the fly.

## Area of application and typical Use Cases

It is important to note: the library is designed primarily to work in the browser. In server applications, in heavyweight applications on Node.JS, it is better to use other logging libraries.

The library can be useful both for developers and support staff.

### A typical Use Case in development. 

A developer is looking for a bug and has some class or package “under suspicion”. He configures logging so that only messages from these sources are displayed.  

### A typical Use Case in production: 
A user reports a problem with an application. The support person decides that the problem is in the client side (which runs in the browser). He asks the user to enable logging, open the console tab in the browser and repeat the operation where the error occurs, copy the output from the console and send it to support. 

Again - while instructing the user on logging settings, he may advise him to enable logging of only the “suspicious” class or package, thus making the logging output observable. 

You can see how this can work in our [demo application](https://vsirotin.github.io/digital-treasure-chest/). 
Open a console window in your browser, and in the app, go to settings and select logging mode under “Logging”. Then work with searching for numbers. 


## Requirements

The creators of the TypeScript language, like the creators of most other programming languages, did not think about the fact that users of their language would need to search for errors, improve and debug TypeScript-written programs with the help of logging. That's why TypeScript at birth was given only the console functions to output errors, warnings, and other information from JavaScript.

This may be sufficient in relatively simple applications, but in complex applications, and even more so in enterpreise applications running both in the browser, it turns out to be insufficient.

Naive use of these features presents a dilemma. If a developer used them extensively in his code, he will end up with so many lines in his console that it will be extremely difficult to deal with them. If the use of console functions is minimized, they will certainly be insufficient in finding some problems.

The solution to this problem has long been found in other programming languages, for example, in Java, but not at the level of the language itself, but at the level of external libraries (e.g. Log4J). And the solution is obvious: you should be able to manage the output of logging functions in runtime. 

## How to use it?


If you've programmed in TypeScript or JavaScript before, you've probably already used the functions of the console object built into JavaScript, for example - console.error(...) and know about the logging levels it provides (error, warning, log, debug).
So, the first rule is that instead of calling the functions of this object, just put functions with the same names from a member of your class, let's call it logger. 

```
this.logger.error(...)
```

## How to create it?

Of course, it must be created before doing this. In our case, we should do it using the ILogger interface:
```
logger = LoggerFactory.getLogger('MyClass');
```
The parameter in this call means the id by which your logger will be searched for among its factory-created counterparts. In big application it is recomended (but not necessary) to use common naiming convention:

DOMEN.PROJECT.CLASS(COMPONENT).

like:

```
logger = LoggerFactory.getLogger('com.example.my-project.MyClass');
```

## How to configure it by development?

Unlike similar console calls, after the above method of creation, our class will by default output only calls from error and warn, and ignore the rest, for example log or debug. 

This solution seems to me more pragmatic if your project has many classes with built-in logging.

But sometimes, especially at the development stage, you need to log not only information about errors and warnings, but also other information.
What other information? - Log4ts provides the following levels of logging based on their severity:

**0** or negative number - all information types (error, warn, log and debug) is output,

**1** - only error, warn and log,

**2** - only error and warn (as you have noticed, this mode is enabled by default),

**3** - only error,

**4** and more - all calls are ignored. 

To change the logging level on the fly, you need to call the setLogLevel(...) class function. For example, to enable output of all logging calls:
```
logger.setLogLevel(0);
```

However, you don't have to remember which parameter value corresponds to what. There are convenient functions for this purpose: 
- **setErrorLevel** - displays only errors.
- **setDefaultLevel** - displays errors and warnings.
- **setAllLevels** - displays all messages.
- **setNoLogging** - disables all messages.

These functions control the behavior of an individual logger. Static **LoggerFactory** functions with similar names (**setErrorLevelByAllLoggers, setDefaultLevelByAllLoggers, setAllLevelsByAllLoggers, setNoLoggingByAllLoggers**) perform the same settings, but for all loggers created to this point.


Next, using text filters, you can dynamically switch the logging level in your classes. 

For example, the example below allows you to turn off logging for all loggers with 'com.example.my-project.M' in ID, also our defined above class:
```
LoggerFactory.setLogLevel('*com.example.my-project.M*', 0);
```
The asterisks in the search string can be at the beginning or end of the search pattern. 

The table below shows the different uses of the searched sub-pathes (listed in the first row of the table) for the three identifiers listed in the left column of the table. 

| sub-path  | *b/c | a* | *b* | e/b/c | x/y/z | * |
|-----------|------|----|-----|-------|-------|---|
| a/b/c     | +    | +  | +   |   -   | -     | + |
| a/d/c     | -    | +  | -   |   -   | -     | + |
| e/b/c     | +    | -  | +   |   +   | -     | + |



You can find out further details of the library usage if you look through the texts of the library's tests [for Logger](https://github.com/vsirotin/communist-web-shop/blob/be1c3b21234f83c3e54d816d9ae0c40b1c38e8a9/projects/log4ts/src/lib/logger.spec.ts) and [for Loggerfactory](https://github.com/vsirotin/communist-web-shop/blob/be1c3b21234f83c3e54d816d9ae0c40b1c38e8a9/projects/log4ts/src/lib/logger.spec.ts) 

## How to configure it in production (runtime)?

To manage loggers in runtime (e.g. for end-user support purposes), you need to be able to call LoggerFactory functions from some of your UI components. 

The [demo-application](https://vsirotin.github.io/digital-treasure-chest/) shows [an example of such UI component](https://github.com/vsirotin/communist-web-shop/blob/5947b666295c010415b5742ede6c5e3850d72006/projects/main-app/src/shared/components/log-setting)

## Best Practices

Especially when creating libraries and shared components, given that logging can be done from many components at once, I recommend that for better readability and understandability of logs, you use classical name conventions by creating the loggers:

DOMAIN.PROJECT.CLASS(COMPONENT). 

In the present implementation the displaying the address of the logging point is unusefull, since the output is ultimately done by calling browser console functions.  Therefore, we recommend specifying the logging point explicitly by specifying the name of the function being logged.

If your function contains several logger calls with the same level, it is recommended to distinguish these calls either by introductory texts or with some numbers.

Here is an example of how to create a logger by considering the naming convention, specifying the function being logged, and distinguishing between loggers within the same function:

```javascript
export class FileProcessor {
...
  private logger: ILogger = LoggerFactory.getLogger('eu.sirotin.lfp.FileProcessor');
...

  constructor(listPath?: string) {
    ...
    this.logger.log('constructor: FileProcessor created. List path:', listPath);

  }

  public processFile(filePath: string, outputDir: string): void {
    if (!this.analyzeLanguageFileSyntax(filePath)) {
      this.logger.error('In processFile. ERROR 100: Syntax analysis failed.');
      return;
    }
    ...

    if (this.listPath && !this.compareLanguageCodes()) {
      this.logger.error('In processFile. ERROR 200: Language code comparison failed.');
      return;
    }
...
  }
```  

## Release Notes # 

### 2.0.1 
Interface consolidation and documentation improvement.

### 2.0.2
Testing and documentation improvenment. 

### 3.0.0

1. Class LoggerFactory.

    - New functions added: setErrorLevelByAllLoggers, setDefaultLevelByAllLoggers, setAllLevelsByAllLoggers, setNoLoggingByAllLoggers
    - Function recetDefaults in class LoggerFactory renamed in setDefaultLoggerConfig

2. Interface ILogger and its implementation extended with functions:  setErrorLevel, setDefaultLevel, setAllLevels, setNoLogging 

3. Tests and documentation updated.