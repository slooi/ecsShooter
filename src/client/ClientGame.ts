import ControllableComponent from "../shared/ecs/components/ControllableComponent.js";
import MoveRandomComponent from "../shared/ecs/components/MoveRandomComponent.js";
import Position2DComponent from "../shared/ecs/components/Position2DComponent.js";
import RenderableComponent from "../shared/ecs/components/RenderableComponent.js";
import ControllableSystem from "../shared/ecs/systems/ControllableSystem.js";
import MoveRandomSystem from "../shared/ecs/systems/MoveRandomSystem.js";
import RendererSystem from "../shared/ecs/systems/RendererSystem.js";
import { ECSManager } from "../packages/ecs/ECSManager.js";
import InputManager from "./InputManager.js";

export default class ClientGame {
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
