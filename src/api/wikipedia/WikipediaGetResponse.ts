import { ResponseBase } from "../core/ResponseBase";

/** Wikipedia search model */
export interface IWikipediaSearch {
	ns: number,
	title: string,
	pageid: number,
	size: number,
	wordcount: number,
	// snippet: "<span class=\"searchmatch\">Nelson</span> Rolihlahla <span class=\"searchmatch\">Mandela</span> (/mænˈdɛlə/, Xhosa: [xoliɬaˈɬa <span class=\"searchmatch\">manˈdɛla</span>]; 18 July 1918 – 5 December 2013) was a South African anti-apartheid revolutionary,",
	snippet: string,
	timestamp: Date
}

/**
 * Wikipedia get response body
 */
export interface IWikipediaGetResponseBody {
	batchcomplete: string,
	continue: {
		sroffset: number,
		continue: string
	},
	query: {
		searchinfo: {
			totalhits: number
		},
		search: IWikipediaSearch[]
	}
}

export class WikipediaGetResponse implements ResponseBase {
	body: IWikipediaGetResponseBody
}
