import { IFetchAction, IReplaceAction, IReplaceAllAction, WikipediaSearchActionType } from "./Types";

/**
 * Fetch action
 */
export function fetch(payload: string): IFetchAction {
	return {
		type: WikipediaSearchActionType.Fetch,
		payload: payload
	}
}

/**
 * Replace action
 */
export function replace(payload: string): IReplaceAction {
	return {
		type: WikipediaSearchActionType.Replace,
		payload: payload
	}
}

/**
 * Replace all action
 */
export function replaceAll(payload: string): IReplaceAllAction {
	return {
		type: WikipediaSearchActionType.ReplaceAll,
		payload: payload
	}
}
