import { IKeyValue } from "../../../system/IKeyValue"
import { LoadingStatus } from "../../../system/LoadingStatus";
import { IHightlightSnippet } from "../interfaces/IHightlightSnippet";

/**
 * Redux store model
 */
export interface IWikipediaSearchReduxStore {
	/** Wikipedia search state */
	wikipediaSearch: IWikipediaSearchState
}

/**
 * State model
 */
export interface IWikipediaSearchState {
	/** Is container loading */
	loading: LoadingStatus;
	/** Search phrase */
	searchPhrase: string;
	/** Search result */
	searchResult: WikipediaSearchResult;
	/** Is replace disabled */
	replaceDisabled: boolean;
	/** Found count */
	foundCount: number;
}

/**
 * Wikipedia search data model
 */
export interface WikipediaSearchData {
	/** Page id */
	pageId: number;
	/** Title */
	title: string;
	/** Snippet */
	snippet: string;
	/** Hightlight Snippet */
	hightlightSnippet: IHightlightSnippet[]
}

/**
 * Search result object
 */
export type WikipediaSearchResult = IKeyValue<WikipediaSearchData>;

/**
 * Initial state
 */
export const initState: IWikipediaSearchState = {
	loading: LoadingStatus.Success,
	searchPhrase: "",
	searchResult: {},
	replaceDisabled: false,
	foundCount: 0
}
