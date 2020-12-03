import { IWikipediaGetRequestBody } from "./WikipediaGetRequest";


/**
 * Wikipedia get criteria
 */
export class WikipediaGetCriteria {
	/** Wikipedia get request body */
	body: IWikipediaGetRequestBody

	constructor (searchPhrase: string) {
		this.body = {
			action: "query",
			list: "search",
			format: "json",
			srSearch: "\"" + searchPhrase + "\""
		}
	}
}

