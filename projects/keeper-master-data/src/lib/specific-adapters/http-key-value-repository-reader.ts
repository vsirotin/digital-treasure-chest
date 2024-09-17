import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { RepositoryReaderAsync } from "../i-repository-adapters";

/*
    Implementation of IReadOnlyRepositoryAdapter for HTTP-based key-value repository.
*/

export class HTTPKeyValueRepositoryReader  extends RepositoryReaderAsync<Object> {


    private logger: ILogger;
    constructor(private urlPrefix: string) {
        super();
        this.logger = LoggerFactory.getLogger("HTTPKeyValueRepositoryAdapter for " + urlPrefix);
        this.logger.log("HTTPKeyValueRepositoryAdapter created for ", urlPrefix);
    }

    /*
        Fetch (load) an object from repository by key.
        @param key Key
        @param object Object
    */
    override async readAsync(key: string): Promise<Object | undefined> {
    
        let path = this.urlPrefix + key + ".json";
        this.logger.debug("Start of fetching from " + path);
        return await fetch(path)
            .then(response => {
                if (!response.ok) {
                    this.logger.warn("In Localizer.loadLanguageRelevantItemsFromServer HTTP error. Status=",
                        response.status, "by fetching from ", path);
                }
                return response.json();
            }).catch((error) => {
                this.logger.error("In fetch catch error=" + error);
                return undefined;
            });
    }
}
