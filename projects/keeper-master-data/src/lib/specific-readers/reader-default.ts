import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { RepositoryReaderSync } from "../i-repository-adapters";

/**
 * Default reader. Simply always return default value.
 */

export class ReaderDefault<T> extends RepositoryReaderSync<T> {

    loggger: ILogger = LoggerFactory.getLogger("ReaderDefault");

    constructor(private defaultData: T) {
        super();
        this.loggger.log(" created for ", defaultData);
    }

    override readSync(key: string): T | undefined {
        this.loggger.log("readSync for ", key, " returns ", this.defaultData);
        return this.defaultData;
    }
}
