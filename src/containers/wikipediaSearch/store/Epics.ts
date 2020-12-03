import { switchMap } from "rxjs/operators"
import { Epic, ofType } from "redux-observable";
import { IErrorAction, IFetchAction, IFetchSuccessAction, WikipediaSearchAction, WikipediaSearchActionType } from "./Types";
import { WikipediaGetApi } from "../../../api/wikipedia/WikipediaManager";
import { WikipediaGetResponse } from "../../../api/wikipedia/WikipediaGetResponse";
import { WikipediaGetCriteria } from "../../../api/wikipedia/WikipediaGetCriteria";


/** Fetch epic*/
const fetchEpic: Epic<WikipediaSearchAction> = (action$, state$) =>
	action$.pipe(
		ofType(WikipediaSearchActionType.Fetch),
		switchMap(async (action) => {
			const searchPhrase: string = (<IFetchAction>action).payload;
			const criteria: WikipediaGetCriteria = new WikipediaGetCriteria(searchPhrase)
			const response: WikipediaGetResponse = await WikipediaGetApi(criteria);
			if (response != null && response.body != null) {
				return <IFetchSuccessAction>{
					type: WikipediaSearchActionType.FetchSuccess,
					payload: response.body
				}
			}
			return <IErrorAction>{
				type: WikipediaSearchActionType.Error
			}
		})
	);


export const wikipediaSearchEpic: Epic[] = [
	fetchEpic
]
