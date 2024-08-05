interface IToken {
	create<T extends Record<string, unknown>>(payload: T): string;
}

export { IToken };
