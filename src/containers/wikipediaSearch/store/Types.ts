import { Action } from "redux"
import { IWikipediaGetResponseBody } from "../../../api/wikipedia/WikipediaGetResponse"

/**
 * Action types
 */
export enum WikipediaSearchActionType {
	/** Error action type */
	Error = "WikipediaSearchError",
	/** Fetch action type */
	Fetch = "WikipediaSearchFetch",
	/** Fetch success action type */
	FetchSuccess = "WikipediaSearchFetchSuccess",
	/** Replace action type */
	Replace = "WikipediaSearchReplace",
	/** Replace all action type */
	ReplaceAll = "WikipediaSearchReplaceAll"
}

/**
 * Error action model
 */
export interface IErrorAction extends Action<WikipediaSearchActionType.Error> {
}

/**
 * Fetch action model
 */
export interface IFetchAction extends Action<WikipediaSearchActionType.Fetch> {
	/** Search phrase */
	payload: string;
}

/**
 * Fetch action model
 */
export interface IFetchSuccessAction extends Action<WikipediaSearchActionType.FetchSuccess> {
	/** Fetch success payload */
	payload: IWikipediaGetResponseBody;
}

/**
 * Replace action model
 */
export interface IReplaceAction extends Action<WikipediaSearchActionType.Replace> {
	/** Replace phrase */
	payload: string
}

/**
 * Replace action model
 */
export interface IReplaceAllAction extends Action<WikipediaSearchActionType.ReplaceAll> {
	/** Replace phrase */
	payload: string;
}


/**
 * Action type
 */
export type WikipediaSearchAction = IErrorAction
	| IFetchAction
	| IFetchSuccessAction
	| IReplaceAction
	| IReplaceAllAction
