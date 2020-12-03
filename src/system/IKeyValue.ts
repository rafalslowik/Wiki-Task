/**
 * Key value model
 */
export interface IKeyValue<T> {
	/** String key with value of T type */
	[key: string]: T
}
