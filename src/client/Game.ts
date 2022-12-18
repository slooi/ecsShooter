import ControllableComponent from "../ecs/components/ControllableComponent";
import MoveRandomComponent from "../ecs/components/MoveRandomComponent";
import Position2DComponent from "../ecs/components/Position2DComponent";
import RenderableComponent from "../ecs/components/RenderableComponent";
import ControllableSystem from "../ecs/systems/ControllableSystem";
import MoveRandomSystem from "../ecs/systems/MoveRandomSystem";
import RendererSystem from "../ecs/systems/RendererSystem";
import { ECSManager } from "../packages/ecs";
import InputManager from "./InputManager";

export default class Game {
	constructor() {
		//
		const canvas = document.createElement("canvas");
		canvas.width = 500;
		canvas.height = 500;
		document.body.appendChild(canvas);

		// SETUP
		const inputManager = new InputManager();
		const ecsManager = new ECSManager();

		// ADD ENTITIES
		ecsManager.addEntity(new Position2DComponent(10, 15), new ControllableComponent(), new RenderableComponent());
		for (let i = 0; i < 250; i++) {
			ecsManager.addEntity(
				new Position2DComponent(Math.random() * 200 + 250 - 100, Math.random() * 200 + 250 - 100),
				new MoveRandomComponent(),
				new RenderableComponent()
			);
		}

		// ADD SYSTEMS
		ecsManager.addSystems(new ControllableSystem(inputManager), new MoveRandomSystem(), new RendererSystem(canvas));

		function updateLoop() {
			ecsManager.updateSystems();

			requestAnimationFrame(updateLoop);
		}
		updateLoop();
	}
}
