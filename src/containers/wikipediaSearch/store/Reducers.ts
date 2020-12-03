import { Reducer } from "@reduxjs/toolkit";
import produce from "immer"
import { LoadingStatus } from "../../../system/LoadingStatus";
import { IHightlightSnippet } from "../interfaces/IHightlightSnippet";
import { initState, IWikipediaSearchState, WikipediaSearchData } from "./State"
import { WikipediaSearchAction, WikipediaSearchActionType } from "./Types";


/**
 * Wikipedia serach reducer
 */
const reducer: Reducer<IWikipediaSearchState> = (state: IWikipediaSearchState = initState, action: WikipediaSearchAction) => {
	return produce<IWikipediaSearchState>(state, draft => {
		switch (action.type) {
			case WikipediaSearchActionType.Error: {
				draft.foundCount = 0;
				draft.searchResult = {};
				draft.replaceDisabled = true;
				draft.loading = LoadingStatus.Error;
				break;
			}

			case WikipediaSearchActionType.Fetch: {
				draft.foundCount = 0;
				draft.searchResult = {};
				draft.searchPhrase = <string>action.payload;
				draft.loading = LoadingStatus.InProgress;
				break;
			}

			case WikipediaSearchActionType.FetchSuccess: {
				if (action != null && action.payload != null && action.payload.query != null) {
					const { search, searchinfo } = action.payload.query;
					if (search != null && search.length > 0) {
						draft.replaceDisabled = false;
						for (let index = 0; index < search.length; index++) {
							const { pageid, title, snippet } = search[index];
							draft.searchResult[pageid] = {
								pageId: pageid,
								title: title,
								snippet: snippet,
								hightlightSnippet: highlightMatches(snippet, state.searchPhrase)
							}
						}
					}
					draft.foundCount = searchinfo != null && searchinfo.totalhits != null ? searchinfo.totalhits : 0;
				}
				draft.loading = LoadingStatus.Success;
				break;
			}

			case WikipediaSearchActionType.Replace: {
				let replaceDisabled: boolean = false;
				let replaced: boolean = false;
				const resultContainsMatch: WikipediaSearchData[] = Object.values(state.searchResult).filter(el => el.hightlightSnippet.findIndex(el => el.match === true) !== -1);
				for (let i = 0; i < resultContainsMatch.length; i++) {
					const { pageId, hightlightSnippet } = resultContainsMatch[i];
					for (let j = 0; j < hightlightSnippet.length; j++) {
						const { match } = hightlightSnippet[j];
						if (match === true) {
							const newMatchValue: boolean = state.searchResult[pageId].hightlightSnippet[j].text.toLowerCase() === action.payload.toLowerCase();
							draft.searchResult[pageId].hightlightSnippet[j].match = newMatchValue;
							draft.searchResult[pageId].hightlightSnippet[j].text = action.payload;
							replaced = true;
							break;
						}
					}
					if (replaced === true) {
						const hightlightSnippetIndex: number = draft.searchResult[pageId].hightlightSnippet.findIndex(el => el.match === true);
						replaceDisabled = resultContainsMatch.length === 1 && hightlightSnippetIndex === -1;
						break;
					}
				}
				draft.replaceDisabled = replaceDisabled;
				break;
			}

			case WikipediaSearchActionType.ReplaceAll: {
				let replaceDisabled: boolean = false;
				const resultContainsMatch = Object.values(state.searchResult).filter(el => el.hightlightSnippet.findIndex(el => el.match === true) !== -1);
				for (let i = 0; i < resultContainsMatch.length; i++) {
					const { pageId, hightlightSnippet } = resultContainsMatch[i];
					for (let j = 0; j < hightlightSnippet.length; j++) {
						const { match } = hightlightSnippet[j];
						if (match === true) {
							const newMatchValue: boolean = state.searchResult[pageId].hightlightSnippet[j].text.toLowerCase() === action.payload.toLowerCase();
							draft.searchResult[pageId].hightlightSnippet[j].match = newMatchValue;
							draft.searchResult[pageId].hightlightSnippet[j].text = action.payload;
							replaceDisabled = !newMatchValue;
						}
					}
				}
				draft.replaceDisabled = replaceDisabled;
				break;
			}
		}
	})
}

/** Highlight matches */
function highlightMatches(snippet: string, searchPhrase: string): IHightlightSnippet[] {
	let result: IHightlightSnippet[] = [];
	if (snippet != null) {
		const searchPhraseLowerCase: string = searchPhrase.toLowerCase();
		const pattern: string = "(" + searchPhraseLowerCase + ")";
		const regExp: RegExp = new RegExp(pattern, "gi");
		const splited: string[] = snippet.split(regExp);
		for (let index: number = 0; index < splited.length; index++) {
			const element = splited[index];
			const match: boolean = element.toLowerCase() === searchPhraseLowerCase;
			result.push({
				match: match,
				text: element
			});
		}
	}

	return result
}

export {
	reducer as WikipediaSearchReducer
}
