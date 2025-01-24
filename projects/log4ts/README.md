# Log4ts

[![GitHub license](https://img.shields.io/badge/license-Apache%20License%202.0-blue.svg?style=flat)](https://www.apache.org/licenses/LICENSE-2.0)

[![npm](https://img.shields.io/npm/v/@vsirotin/log4ts?sort=semver&logo=npm)](https://www.npmjs.com/package/@vsirotin/log4ts)
[![npm type definitions](https://img.shields.io/npm/types/v-github-icon?logo=typescript)](https://github.com/vinayakkulkarni/v-github-icon/blob/main/package.json)

[![npm](https://img.shields.io/npm/dt/@vsirotin/log4ts?logo=npm)](http://npm-stat.com/charts.html?package=@vsirotin/log4ts)
[![npm](https://img.shields.io/npm/dw/@vsirotin/log4ts?logo=npm)](http://npm-stat.com/charts.html?package=@vsirotin/log4ts)


The Log4ts library makes it easy and more convenient than console.log etc. to output data about the operation of your TypeScript (e.g. Angular or Node.js) application to the browser console, dynamically managing this output in real time.


## Requirements

The creators of the TypeScript language, like the creators of most other programming languages, did not think about the fact that users of their language would need to search for errors, improve and debug TypeScript-written programs with the help of logging. That's why TypeScript at birth was given only the console.log function and its sisters to output errors, warnings, and other information from JavaScript.

This may be sufficient in relatively simple applications, but in complex applications, and even more so in enterpreise applications running both in the browser and on the server, it turns out to be insufficient.

Naive use of these features presents a dilemma. If a developer used them extensively in his code, he will end up with so many lines in his console that it will be extremely difficult to deal with them. If the use of console functions is minimized, they will certainly be insufficient in finding some problems.

The solution to this problem has long been found in other programming languages, for example, in Java, but not at the level of the language itself, but at the level of external libraries. And the solution is obvious: you should be able to manage the output of logging functions in real time. 

It would be desirable to avoid the problems that Java went through in its development when many competing and incompatible logging systems were created. If you use foreign libraries with different logging systems in your project, you get an additional headache on the spot. 

The Java development community finally solved this problem by agreeing on an interface that all future logging libraries must support.

And the last important requirement that I tried to realize in the described library is that simple things should be simple, and more complicated things should be ... as simple as possible. 

It would seem to be an obvious requirement. But I have experienced more than once that before you can use the simplest function of this or that library, you somehow have to perform a lot of strange rituals. 

## How to use it

How are the above requirements implemented specifically? How to use the library?

If you've programmed in TypeScript or JavaScript before, you've probably already used the functions of the console object built into JavaScript, for example - console.error(...) and know about the logging levels it provides (error, warning, log, debug).
So, the first rule is that instead of calling the functions of this object, just put functions with the same names from a member of your class, let's call it logger. 

```
this.logger.error(...)
```

Of course, it must be created before doing this. In our case, we should do it using the ILogger interface:
```
logger = LoggerFactory.getLogger('MyClass');
```
The parameter in this call means the id by which your logger will be searched for among its factory-created counterparts. In big application it is recomended (but not necessary) to use the path to your class in the project directory with source code for this purpose:

```
logger = LoggerFactory.getLogger('shared/classes/MyClass');
```


Unlike similar console calls, after the above method of creation, our class will output only calls from error and warn, and ignore the rest, for example debug. This solution seems to me more pragmatic if your project has many classes with built-in logging.
But sometimes, especially at the development stage, you need to log not only information about errors and warnings, but also other information.
What other information? - Log4ts provides the following levels of logging based on their severity:

**0** or negative number - all information from all class function calls (error, warn, log and debug) is output,

**1** - only error, warn and log,

**2** - only error and warn (as you have noticed, this mode is enabled by default),

**3** - only error,

**4** and more - all calls are ignored. 

To change the logging level on the fly, you need to call the setLogLevel(...) class function. For example, to enable output of all logging calls:
```
logger.setLogLevel(0);
```

Next, using text filters, you can dynamically switch the logging level in your classes. 

For example, the example below allows you to turn off logging for all loggers with 'shared/classes/M' in ID, also our defined above class:
```
LoggerFactory.setLogLevel('*'shared/classes/M*', 0);
```
The asterisks in the search string can be at the beginning or end of the search pattern. 

The table below shows the different uses of the lookup pattern (listed in the first row of the table) for the three identifiers listed in the first column of the table. 

| path  | *b/c | a* | *b* | e/b/c | x/y/z | * |
|-------|------|----|-----|-------|-------|---|
| a/b/c | +    | +  | +   |   -   | -     | + |
| a/d/c | -    | +  | +   |   -   | -     | + |
| e/b/c | +    | -  | +   |   +   | -     | + |


You can find out further details of the library usage if you look through the texts of the library's tests in the file yourself: 
https://github.com/vsirotin/communist-web-shop/blob/be1c3b21234f83c3e54d816d9ae0c40b1c38e8a9/projects/log4ts/src/lib/logger.spec.ts

In big web application you probably need to develop some UI component to manage loggin in runtime (e.g. to support of end users). The application  https://github.com/vsirotin/communist-web-shop/blob/70a8bf069c2cfd4626b9de43e36aea35b6eda570/projects/main-app shows an example of such UI (component https://github.com/vsirotin/communist-web-shop/blob/5947b666295c010415b5742ede6c5e3850d72006/projects/main-app/src/shared/components/log-setting)

# Release Notes # 

## 2.0.1 # 
Interface consolidation and documentation improvement.