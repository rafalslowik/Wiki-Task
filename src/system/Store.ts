import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { combineEpics } from "redux-observable";
import { wikipediaSearchEpic } from "../containers/wikipediaSearch/store/Epics";
import { WikipediaSearchReducer } from "../containers/wikipediaSearch/store/Reducers";
import { IWikipediaSearchReduxStore } from '../containers/wikipediaSearch/store/State';


/** Redux store model */
export interface IReduxStore extends IWikipediaSearchReduxStore {
}

/** Root reducer */
export const rootReducer = combineReducers<IReduxStore>({
	wikipediaSearch: WikipediaSearchReducer
});

// /** Epic middleware instance */
const epicMiddleware = createEpicMiddleware();

/** Compose enhancers */
const composeEnhancers = composeWithDevTools({
	/** Specify name here, actionsBlacklist, actionsCreators and other options if needed */
});

/** Create store */
export const store = createStore(
	rootReducer,
	composeEnhancers(
		applyMiddleware(epicMiddleware)
	)
);

/** System global epics */
export const rootEpic = combineEpics(...wikipediaSearchEpic);

/** Run epic middleware  */
epicMiddleware.run(rootEpic);


/** Redux Thunk */
// export const store = configureStore<IReduxStore>({
// 	reducer: {
// 		wikipediaSearch: WikipediaSearchReducer
// 	},
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
// 	ReturnType,
// 	RootState,
// 	unknown,
// 	Action<string>
// >;
