import { IKeyValue } from "../../system/IKeyValue";
import { RequestBody } from "./RequestBody";

/**
 * Base base request
 */
export abstract class RequestBaseCore {
	/** Request body */
	body?: RequestBody;

	constructor (
		public url: string
	) {
	}
}
