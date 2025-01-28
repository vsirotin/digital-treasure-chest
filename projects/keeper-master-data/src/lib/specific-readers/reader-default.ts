import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { RepositoryReaderSync } from "../i-repository-adapters";

/**
 * Default reader. Simply always return default value.
 */
export class ReaderDefault<T> extends RepositoryReaderSync<T> {

    loggger: ILogger = LoggerFactory.getLogger("eu.sirotin.kmd.ReaderDefault");

    constructor(private defaultData: T) {
        super();
        this.loggger.log("constructor: created for ", defaultData);
    }

    /**
     * Read the default data synchronously.
     * @param key key for searching the data
     * @returns 
     */
    override readSync(key: string): T | undefined {
        this.loggger.log("readSync for ", key, " returns ", this.defaultData);
        return this.defaultData;
    }
}
