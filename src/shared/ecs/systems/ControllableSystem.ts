import InputManager from "../../../client/InputManager";
import { ECSManager, System } from "../../../packages/ecs";
import ControllableComponent from "../components/ControllableComponent";
import Position2DComponent from "../components/Position2DComponent";

export default class ControllableSystem extends System {
	inputManager: InputManager;
	constructor(inputManager: InputManager) {
		super();
		this.inputManager = inputManager;
	}
	update(ecsManager: ECSManager): void {
		const entityComponentTuples = ecsManager.view(ControllableComponent, Position2DComponent);
		entityComponentTuples.forEach((entityComponentTuple) => {
			const positionComponent = entityComponentTuple[1].get(Position2DComponent);

			if (this.inputManager.keysDown["KeyW"]) {
				positionComponent.y -= 5;
			}
			if (this.inputManager.keysDown["KeyS"]) {
				positionComponent.y += 5;
			}
			if (this.inputManager.keysDown["KeyA"]) {
				positionComponent.x -= 5;
			}
			if (this.inputManager.keysDown["KeyD"]) {
				positionComponent.x += 5;
			}
		});
	}
}
