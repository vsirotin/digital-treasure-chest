# Log4ts

The Log4ts library makes it easy and more convenient than console.log etc. to output data about the operation of your TypeScript (e.g. Angular) application to the browser console, dynamically managing this output in real time.
In addition, using it allows you to easily build extensions, for example to redirect log data output to a file or forward it to another server.

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

Of course, it must be declared before doing this. In our case, we should do it using the ILogger interface:
```
logger : ILogger
```

This will allow you to replace one implementation with another later, if necessary, without rewriting the body of your class. 

Of course, in order for this to work, you need to have a class that implements the ILogger interface and bind an instance of that class to our logger element. The "main" class of our library, Log4ts, is well suited for this purpose. 

```
logger = new Log4ts() 
```

Unlike similar console calls, after the above method of creation, our class will output only calls from error and warn, and ignore the rest, for example debug. This solution seems to me more pragmatic if your project has many classes with built-in logging.
But sometimes, especially at the development stage, you need to log not only information about errors and warnings, but also other information.
What other information? - Log4ts provides the following levels of logging based on their severity:

**0** or negative number - all information from all class function calls (error, warn, log and debug) is output,

**1** - only error, warn and log,

**2** - only error and warn (as you have noticed, this mode is enabled by default),

**3** - only error,

**4** and more - all calls are ignored. 

To change the logging level on the fly, you need to call the setLogLevel(...) class function. For example, to disable logging completely:
```
logger.setLogLevel(0);
```

But you can set the logging level already when creating an instance of the class: 
```
logger = new Log4ts(0);
```
It is convenient to change the logging level by changing a line in the source text at the development stage. This cannot be done at the operation stage. Besides, at this stage you would like to be able to change the logging level for individual classes or groups of classes. 

To achieve this, you will need to change the way you create loggers in your project's classes, namely by using a factory: 
```
logger = LoggerFactory.getLogger('x/y/z');
```

The text parameter in this call means the id by which your logger will be searched for among its factory-created counterparts. It is easiest (but not necessary) to use the path to your class in the project directory with source code for this purpose. 

Next, using text filters, you can dynamically switch the logging level in your classes. For example, the example below allows you to turn off logging for all loggers in all directories ending in b/c (in case you chose the recommended approach to setting logger IDs above):
```
LoggerFactory.setLogLevel('*b/c', 0);
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

*I should note that Log4ts is the first, relatively finished part of the project. So don't be surprised by the relative emptiness of its other components.*  

