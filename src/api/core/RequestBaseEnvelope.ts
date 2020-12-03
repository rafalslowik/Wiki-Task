import axios from "axios"
import { IKeyValue } from "../../system/IKeyValue";
import { RequestBaseCore } from "./RequestBaseCore";
import { ResponseBase } from "./ResponseBase";

/**
 * Request base envelope
 */
export abstract class RequestBaseEnvelope {

	constructor (
		public request: RequestBaseCore
	) {

	}

	/**
	 * Sending request to API Server
	 */
	public abstract send<R extends ResponseBase>(): Promise<R>;

	/**
	 * Call api
	 */
	protected callApi<R extends ResponseBase>(): Promise<R> {
		const url: string = this.getRequestUrl();
		return axios.get(url)
			.then(response => {
				return {
					body: response.data
				} as R
			})
			.catch(er => {
				console.error(er)
				return null
			})
	}

	/**
 * Prepare url
 */
	private getRequestUrl(): string {
		let result = this.request.url + "?origin=*";
		if (this.request.body != null) {
			Object.keys(this.request.body)
				.forEach((key) => {
					result += "&" + key.toLowerCase() + "=" + this.request.body[key];
				});
		}

		return result;
	}
}
