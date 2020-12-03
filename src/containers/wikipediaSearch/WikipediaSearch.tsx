import * as React from 'react';
import { connect } from 'react-redux'
import { IFetchAction, IReplaceAction, IReplaceAllAction } from './store/Types';
import { fetch, replace, replaceAll } from './store/Actions';
import { IWikipediaSearchReduxStore, WikipediaSearchData, WikipediaSearchResult } from './store/State';
import { Resource } from './enums/Resource';
import produce from 'immer';
import { Fragment } from 'react';
import { LoadingStatus } from '../../system/LoadingStatus';
import { IHightlightSnippet } from './interfaces/IHightlightSnippet';

/** Props model */
interface IProps {
	/** Is container loading */
	loading: LoadingStatus;
	/** Search result */
	searchResult: WikipediaSearchResult;
	/** Is replace disabled */
	replaceDisabled: boolean;
	/** Found count */
	foundCount: number;
}

/** State props from store */
const mapStateToProps = (state: IWikipediaSearchReduxStore): IProps => {
	if (state && state.wikipediaSearch) {
		return {
			loading: state.wikipediaSearch.loading,
			searchResult: state.wikipediaSearch.searchResult,
			replaceDisabled: state.wikipediaSearch.replaceDisabled,
			foundCount: state.wikipediaSearch.foundCount
		};
	}
}

/**
 * Dispatch props model
 */
interface IDispatchProps {
	/** Fetch action */
	fetch: (searchPhrase: string) => IFetchAction;
	/** Replace action */
	replace: (payload: string) => IReplaceAction;
	/** Replace all action */
	replaceAll: (replacePhrase: string) => IReplaceAllAction;
}

/**
 * Dispatch props
 */
const mapDispatchToProps: IDispatchProps = {
	fetch, replace, replaceAll
}

/**
 * Wikipedia search combined props
 */
export interface IWikipediaSearchProps extends IProps, IDispatchProps {
}

/**
 * Wikipedia search state
 */
interface IState {
	/** Search phrase value */
	searchPhrase: string;
	/** Replace with value */
	replaceWith: string;
}

/**
 * Wikipedia search container
 */
class WikipediaSearch extends React.Component<IWikipediaSearchProps, IState> {
	/** Request timer */
	private timer: NodeJS.Timeout;
	/** Fetch delay after key click */
	private readonly timeLimit: number = 2000;
	/** Search phrase input id */
	private readonly searchPhraseInputId = "searchPhrase";
	/** Replace with input id */
	private readonly replaceWithInputId = "replaceWith";

	state: IState = {
		searchPhrase: "",
		replaceWith: ""
	}

	/** Trigger serach */
	triggerSearch = (searchPhrase: string): void => {
		clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			this.props.fetch(searchPhrase);
		}, this.timeLimit);
	}

	/** Handle search button click */
	private handleSearchButtonClick = () => {
		clearTimeout(this.timer);
		this.props.fetch(this.state.searchPhrase);
	}

	/** Handle replace button click */
	private handleReplaceButtonClick = () => {
		this.props.replace(this.state.replaceWith)
	}

	/** Handle replace all button click */
	private handleReplaceAllButtonClick = () => {
		this.props.replaceAll(this.state.replaceWith);
	}

	/** Handle input value change */
	private handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputId: string = event.target.id;
		const value: string = event.target.value;

		this.setState(
			produce((draft: IState) => {
				if ((draft as Object).hasOwnProperty(inputId)) {
					draft[inputId] = value;
				}
			}),
			() => {
				if (inputId === this.searchPhraseInputId) {
					this.triggerSearch(this.state.searchPhrase)
				}
			}
		);
	}

	/** Prepare snippet value */
	getSnippet(hightlightSnippet: IHightlightSnippet[]): JSX.Element[] {
		let result: JSX.Element[] = [];
		for (let index: number = 0; index < hightlightSnippet.length; index++) {
			const { match, text } = hightlightSnippet[index];
			if (match === true) {
				result.push(
					<Fragment key={index}>
						<mark>{text}</mark>
					</Fragment>
				);
			}
			else {
				result.push(
					<Fragment key={index}>
						{text}
					</Fragment>
				);
			}
		}

		return result;
	}

	/** Prepare result item */
	getItem(element: WikipediaSearchData): JSX.Element {
		return <>
			<div style={{ display: "table-row" }}>
				<div style={{ display: "table-cell" }}>
					{element.title}
				</div>
				<div style={{ display: "table-cell" }}>
					{this.getSnippet(element.hightlightSnippet)}
				</div>
			</div>
		</>
	}

	/** Prepare search result */
	getResult(): JSX.Element {
		let result: JSX.Element = null;
		switch (this.props.loading) {
			case LoadingStatus.Success:
				const data: WikipediaSearchData[] = Object.values(this.props.searchResult);
				if (data.length > 0) {
					const tableItems: JSX.Element[] = [];
					for (let index: number = 0; index < data.length; index++) {
						const element: WikipediaSearchData = data[index];
						tableItems.push(<Fragment key={index}>
							{this.getItem(element)}
						</Fragment>);
					}
					result = <div style={{ display: "table" }}>
						<div style={{ display: "table-header-group", fontWeight: "bold" }}>
							<div style={{ display: "table-cell" }}>
								{Resource.TitleTableHeader}
							</div>
							<div style={{ display: "table-cell" }}>
								{Resource.SnippetTableHeader}
							</div>
						</div>
						{tableItems}
					</div>
				}
				break;
			case LoadingStatus.InProgress:
				result = <span style={{ color: "green" }}>{Resource.Loading}</span>
				break;
			case LoadingStatus.Error:
				result = <span style={{ color: "red" }}>{Resource.SearchError}</span>
				break;
		}

		return result;
	}

	/** Prepare input container */
	getInputs(): JSX.Element {
		return <div>
			<input
				id={this.searchPhraseInputId}
				value={this.state.searchPhrase}
				placeholder={Resource.SearchPhraseInputPlaceholder}
				onChange={this.handleInputChange}
			/>
			<input
				style={{ marginLeft: "5px" }}
				id={this.replaceWithInputId}
				value={this.state.replaceWith}
				placeholder={Resource.ReplaceWithInputPlaceholder}
				onChange={this.handleInputChange}
			/>
		</div>
	}

	/** Prepare button container */
	getButtons(): JSX.Element {
		return <div style={{ marginTop: "5px" }}>
			<button
				onClick={this.handleSearchButtonClick}
			>
				{Resource.SearchButton}
			</button>
			<button
				style={{ marginLeft: "5px" }}
				onClick={this.handleReplaceButtonClick}
				disabled={this.props.replaceDisabled}
			>
				{Resource.ReplaceButton}
			</button>
			<button
				style={{ marginLeft: "5px" }}
				onClick={this.handleReplaceAllButtonClick}
				disabled={this.props.replaceDisabled}
			>
				{Resource.ReplaceAllButton}
			</button>
		</div>
	}

	public render(): JSX.Element {
		return (<>
			{this.getInputs()}
			{this.getButtons()}
			<div style={{ marginTop: "5px" }}>

				<div>
					<label>{Resource.FoundCountLabel}</label>
					<span>{this.props.foundCount}</span>
				</div>
				<div>
					<label>{Resource.VisibleCountLabel} </label>
					<span>{this.props.foundCount < 10 ? this.props.foundCount : 10}</span>
				</div>
				<div>
					<label>{Resource.SearchResultLabel}</label>
					{this.getResult()}
				</div>
			</div>
		</>
		);
	}
}


const wikipediaSearch = connect(mapStateToProps, mapDispatchToProps)(WikipediaSearch);
export {
	wikipediaSearch as WikipediaSearch
};
