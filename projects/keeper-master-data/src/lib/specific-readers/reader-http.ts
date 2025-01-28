import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { RepositoryReaderAsync } from "../i-repository-adapters";

/*
    Implementation of Reader for HTTP-based key-value repository.
*/
export class HTTPKeyValueRepositoryReader  extends RepositoryReaderAsync<Object> {

    private logger: ILogger;
    constructor(private urlPrefix: string) {
        super();
        this.logger = LoggerFactory.getLogger("eu.sirotin.kmd.HTTPKeyValueRepositoryReader for " + urlPrefix);
        this.logger.log("constructor: created for ", urlPrefix);
    }

    /*
        Fetch (load) an object from repository by key.
        @param key Key
        @param object Object
    */
    override async readAsync(key: string):  Promise<Object | undefined>  {
    
        let path = this.urlPrefix + key + ".json";
        this.logger.debug("readAsync: Start of fetching from path=", path);
        const result = fetch(path);
        if(await result === undefined) {
            return result;
        }
 
        return await result.then(response => {
                this.logger.debug("readAsync: After fetching for path=", path, " response.status=", response.status, " response.ok=", response.ok, 
                    " response.statusText=", response.statusText);
                if (!response.ok) {
                    this.logger.warn("readAsync: HTTP error. Status=",
                        response.status, " response.statusText=", response.statusText, " by fetching from ", path);
                }
                return response.json();
            }).catch((error) => {
                this.logger.warn("readAsync: In readAsync error=" + error);
                return undefined;
            });
    }
}