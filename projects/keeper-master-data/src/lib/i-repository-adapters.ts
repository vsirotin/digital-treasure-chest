export interface IRepositoryReader<T>{
    /*
        Shows if an reader is async.
        This strange method is needed because a specific of TypeScript.
    */
    readonly isAsync: boolean;
}
/*
    API for a read-only repository adapter.
*/
export abstract class RepositoryReaderSync<T> implements IRepositoryReader<T> {
    /*
        Fetch (load) an object from repository by key.
        @param key Key
        @param object Object
    */
    abstract read(key: string): T|undefined;

    readonly isAsync: boolean = false;
}

/*
    API for a read-only repository adapter.
*/

export abstract class RepositoryReaderAsync<T> implements IRepositoryReader<T> {
    /*
        Fetch (load) an object from repository by key.
        @param key Key
        @param object Object
    */
    abstract fetch(key: string): Promise<T|undefined>;

    readonly isAsync: boolean = true
}

export interface IRepositoryWiter<T>{
    /*
        Shows if an reader is async.
        This strange method is needed because a specific of TypeScript.
    */
    readonly isAsync: boolean;
}
/*
    API for a writable repository adapter.
*/
export abstract class RepositoryWriterSync<T> implements IRepositoryWiter<T> {

    /*
        Save an object to repository by key.
        @param key Key
        @param object Object
    */
    abstract saveObjectSync(key: string, data: T): void;

    readonly isAsync: boolean = false;
}

/*
    API for a writable repository adapter.
*/

export abstract class RepositoryWriterAsync<T> implements IRepositoryWiter<T> {

    /*
        Save an object to repository by key.
        @param key Key
        @param object Object
    */
    abstract saveObjectAsync(key: string, object: any): Promise<void>;

    readonly isAsync: boolean = true;
}

export interface RepositoryAdapter<T>  {
    readonly reader: IRepositoryReader<T>;
    readonly writer: IRepositoryWiter<T>;
    readonly isAsync: boolean;
}

export abstract class RepositoryAdapterSync<T> implements RepositoryAdapter<T> {
    abstract reader: RepositoryReaderSync<T>;
    abstract writer: RepositoryWriterSync<T>;
    readonly isAsync: boolean = false;
}

export abstract class RepositoryAdapterAsync<T> implements RepositoryAdapter<T> {
    abstract reader: RepositoryReaderAsync<T>;
    abstract writer: RepositoryWriterAsync<T>;
    readonly isAsync: boolean = true;
}
