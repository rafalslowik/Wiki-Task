import ResponseBody from "./ResponseBody";


/** Base response */
interface IResponseBase {
	/** Response Body */
	body: ResponseBody;
}

export type {
	IResponseBase as ResponseBase
};
