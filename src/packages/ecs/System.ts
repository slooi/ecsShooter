import { ECSManager } from "./ECSManager";

export abstract class System {
	readonly ___type = "System"; // Need this or else I could accidentally specify a system as a component
	constructor() {}
	abstract update(ecsManager: ECSManager): void;
}
