import { RouterKey } from "../routes/RouterKey";
import { RoutingProvider } from "../routes/RoutingProvider";
import { RequestBaseCore } from "./RequestBaseCore";


/**
 * Base request
 */
export abstract class RequestBase<T> extends RequestBaseCore {
	body?: T

	constructor (routerKey: RouterKey) {
		const url: string = RoutingProvider.getUrl(routerKey)
		super(url)
	}
}
