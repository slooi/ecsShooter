export abstract class System {
	constructor() {}
	abstract update(...args: unknown[]): void;
}
