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
    /*
        Repository reader.
    */
    readonly reader: IRepositoryReader<T>;

    /*
        Repository writer.
    */
    readonly writer: IRepositoryWiter<T>;
    /*
        Shows if an adapter is async.
    */
    readonly isAsync: boolean;
}
/*
    API for a synchronesly repository adapter.
*/
export abstract class RepositoryAdapterSync<T> implements RepositoryAdapter<T> {
    /*  
        Repository reader.
    */
    abstract reader: RepositoryReaderSync<T>;

    /*
        Repository writer.
    */
    abstract writer: RepositoryWriterSync<T>;
    readonly isAsync: boolean = false;
}
/*
    API for an asynchronesly repository adapter.
*/
export abstract class RepositoryAdapterAsync<T> implements RepositoryAdapter<T> {
    /*  
        Repository reader.
    */
    abstract reader: RepositoryReaderAsync<T>;

    /*
        Repository writer.
    */  
    abstract writer: RepositoryWriterAsync<T>;
    readonly isAsync: boolean = true;
}
