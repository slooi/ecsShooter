import { ECSManager } from "../../../packages/ecs/ECSManager.js";
import { System } from "../../../packages/ecs/System.js";
import MoveRandomComponent from "../components/MoveRandomComponent.js";
import Position2DComponent from "../components/Position2DComponent.js";

export default class MoveRandomSystem extends System {
	update(ecsManager: ECSManager): void {
		const entityComponentObjTuples = ecsManager.view(Position2DComponent, MoveRandomComponent);
		entityComponentObjTuples.forEach((entityComponentObjTuple) => {
			const position2DComponent = entityComponentObjTuple[1].get(Position2DComponent);
			position2DComponent.x += Math.random() * 10 - 5;
			position2DComponent.y += Math.random() * 10 - 5;
		});
	}
}
