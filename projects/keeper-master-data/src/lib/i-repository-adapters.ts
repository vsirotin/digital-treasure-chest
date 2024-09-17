import { ILogger, LoggerFactory } from "@vsirotin/log4ts";

/*
    API for a repository reader.
*/
export interface IRepositoryReader<T>{
    /*
        Shows if an reader is async.
        This strange method is needed because a specific of TypeScript.
    */
    readonly isAsync: boolean;
}
/*
    API for a synchronesly repository reader.
*/
export abstract class RepositoryReaderSync<T> implements IRepositoryReader<T> {
    /*
        Read synchronesly an object from repository by key.
        @param key Key
        @param object Object
    */
    abstract readSync(key: string): T|undefined;

    readonly isAsync: boolean = false;
}

/*
    API for asynchronesly repository reader.
*/

export abstract class RepositoryReaderAsync<T> implements IRepositoryReader<T> {
    /*
        Read asynchronesly an object from repository by key.
        @param key Key
        @param object Object
        @returns Promise with object or undefined
    */
    abstract readAsync(key: string): Promise<T|undefined>;

    readonly isAsync: boolean = true
}

/*
    API for a repository writer.
*/
export interface IRepositoryWiter<T>{

    /*
        Shows if an writer is async.
        This strange method is needed because a specific of TypeScript.
    */
    readonly isAsync: boolean;
}
/*
    API for a writable repository reader.
*/
export abstract class RepositoryWriterSync<T> implements IRepositoryWiter<T> {

    /*
        Save an object to repository by key synchronesly.
        @param key Key
        @param object Object
    */
    abstract saveObjectSync(key: string, data: T): void;

    readonly isAsync: boolean = false;
}

/*
    API for an asynchronesly repository writer.
*/

export abstract class RepositoryWriterAsync<T> implements IRepositoryWiter<T> {

    /*
        Save an object to repository by key asynchronesly.
        @param key Key
        @param object Object
    */
    abstract saveObjectAsync(key: string, object: any): Promise<void>;

    readonly isAsync: boolean = true;
}

/*
    API for a repository adapter.
*/
export interface RepositoryAdapter<T>  {
    readonly isAsync: boolean;
}
/*
    API for a synchronesly repository adapter.
*/
export abstract class RepositoryAdapterSync<T> implements RepositoryAdapter<T> {

    private logger: ILogger = LoggerFactory.getLogger("RepositoryAdapterSync");

    constructor(private reader: RepositoryReaderSync<T>, private writer: RepositoryWriterSync<T>) {};
    readonly isAsync: boolean = false;

    /*
        Save an object to repository by key synchronesly.
        @param key Key
        @param object Object
    */
    saveObjectSync(key: string, object: any): void{
        this.logger.log("In saveObjectSync key=" + key + " object=" + object);
        this.writer.saveObjectSync(key, object);
    }

    /*
        Read an object from repository by key synchronesly.
        @param key Key
        @returns Object
    */
    readSync(key: string): T|undefined{
        const result = this.reader.readSync(key);
        this.logger.log("In readSync key=", key, " result=", result);
        return result;
    }

    /*
        Remove an object from adapter's own storage by key synchronesly.
        @param key  Key
    */
    abstract removeValueForkeySync(key: string): void;
}
/*
    API for an asynchronesly repository adapter.
*/
export abstract class RepositoryAdapterAsync<T> implements RepositoryAdapter<T> {

    private logger: ILogger = LoggerFactory.getLogger("RepositoryAdapterAsync");

    constructor(private reader: RepositoryReaderAsync<T>, private writer: RepositoryWriterAsync<T>) {};

    readonly isAsync: boolean = true;

    /*
        Save an object to repository by key asynchronesly.
        @param key Key
        @param object Object
    */
    saveObjectAsync(key: string, object: any): Promise<void>{
        this.logger.log("In saveObjectAsync key=" + key + " object=" + object);
        return this.writer.saveObjectAsync(key, object);
        
    }

    /*
        Read an object from repository by key asynchronesly.
        @param key Key
        @returns Object
    */
    readAsync(key: string): Promise<T|undefined>{
        this.logger.log("In readAsync key=" + key);
        return this.reader.readAsync(key);
    }

    /*
        Remove an object from adapter's own storage by key asynchronesly.
        @param key  Key
    */
    abstract removeValueForkeyAsync(key: string): void;
}
