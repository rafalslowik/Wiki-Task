import { RequestBase } from "../core/RequestBase";
import { RouterKey } from "../routes/RouterKey";
import { WikipediaGetCriteria } from "./WikipediaGetCriteria";


/**
 * Wikipedia get request body
 */
export interface IWikipediaGetRequestBody {
	/** Action */
	action: string;
	/** List */
	list: string;
	/** Format */
	format: string;
	/** Search for page titles or content matching this value */
	srSearch: string;
}

/**
 * Wikipedia get request class
 */
export class WikipediaGetRequest extends RequestBase<IWikipediaGetRequestBody> {
	constructor (criteria: WikipediaGetCriteria) {
		super(RouterKey.Wikipedia)
		this.body = criteria.body;
	}
}
