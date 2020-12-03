
import { RequestBaseEnvelope } from "./RequestBaseEnvelope";
import { RequestBaseCore } from "./RequestBaseCore";
import { ResponseBase } from "./ResponseBase";


/**
 * Request base envelope
 */
export class RequestEnvelope extends RequestBaseEnvelope {

	constructor (request: RequestBaseCore) {
		super(request);
	}

	public send<R extends ResponseBase>(): Promise<R> {
		return this.callApi<R>();
	}
}
