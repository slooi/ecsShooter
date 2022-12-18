import { ECSManager, System } from "../../packages/ecs";
import Position2DComponent from "../components/Position2DComponent";

export default class MoveRandomSystem extends System {
	update(ecsManager: ECSManager): void {
		const entityComponentObjTuples = ecsManager.view(Position2DComponent);
		entityComponentObjTuples.forEach((entityComponentObjTuple) => {
			const position2DComponent = entityComponentObjTuple[1].get(Position2DComponent);
			position2DComponent.x += Math.random() * 10 - 5;
			position2DComponent.y += Math.random() * 10 - 5;
		});
	}
}
