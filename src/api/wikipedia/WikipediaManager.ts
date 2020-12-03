import { RequestEnvelope } from "../core/RequestEnvelope"
import { WikipediaGetCriteria } from "./WikipediaGetCriteria";
import { WikipediaGetRequest } from "./WikipediaGetRequest"
import { WikipediaGetResponse } from "./WikipediaGetResponse"

/** Wikipedia Get Api */
export const WikipediaGetApi = async (criteria: WikipediaGetCriteria): Promise<WikipediaGetResponse> => {
	const request: WikipediaGetRequest = new WikipediaGetRequest(criteria);
	const envelope: RequestEnvelope = new RequestEnvelope(request)
	const response: WikipediaGetResponse = await envelope.send<WikipediaGetResponse>();
	return response;
}
