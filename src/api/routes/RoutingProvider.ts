import { RouterKey } from "./RouterKey";

/**
 * Routing provider class to prepare api call route
 */
export abstract class RoutingProvider {

	/**
	 * Prepare api url
	 */
	static getUrl(routerKey: RouterKey) {
		switch (routerKey) {
			case RouterKey.Wikipedia: {
				return "https://en.wikipedia.org/w/api.php"
			}
			default:
				throw Error("Not found url for router key: " + routerKey)
		}
	}
}
