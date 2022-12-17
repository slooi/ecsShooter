import { ECSManager } from "./ECSManager";

export abstract class System {
	constructor() {}
	abstract update(ecsManager: ECSManager): void;
}
