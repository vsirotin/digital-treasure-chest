import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { LocalStorageAdapter } from "./local-storage-adapter";

/*
    Implementation of WritableRepositoryAdapter for local storage based key-value repository with version and hierarhy of categories.
*/
export class LocalStorageAdapterWithVersionsAndCategories extends LocalStorageAdapter {
    private prefix: string;

    override logger: ILogger = LoggerFactory.getLogger("LocalStorageAdapterWithVersionsAndCategories");

    constructor(private version: number, ...categories: string[]) {
        super();
        this.prefix = categories.join("-") + "-v-" + version;
        this.logger.log("LocalStorageAdapterWithVersionsAndCategories created for " + this.prefix);
    }

    override saveObjectSync(key: string, data: string): void {
        super.saveObjectSync(this.generateStorageKey(key), data);
    }

    override readSync(key: string): string | undefined {
        return super.readSync(this.generateStorageKey(key));
    }

    override removeValueForkeySync(key: string): void {
        super.removeValueForkeySync(this.generateStorageKey(key));
    }

    private generateStorageKey(key: string): string {
        return this.prefix + "-" + key;
    }
}
