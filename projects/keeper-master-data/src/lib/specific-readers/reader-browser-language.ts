
import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { RepositoryReaderSync } from "../i-repository-adapters";

/**
 * Reads prefrable user's language in given browser.
 */
export class ReaderBrowserLanguage extends RepositoryReaderSync<string> {

    loggger: ILogger = LoggerFactory.getLogger("ReaderBrowserLanguage");

    constructor() {
        super();
        this.loggger.log(" created");
    }

    /**
    * Reads prefrable user's language in given browser.
    */
    override readSync(_: string): string  {
        const lang = navigator.language;
        this.loggger.log("readSync lang= ", lang);
        return lang;
    }
}
