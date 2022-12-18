import { ECSManager } from "../packages/ecs/ECSManager.js";
import Position2DComponent from "../shared/ecs/components/Position2DComponent.js";
import MoveRandomSystem from "../shared/ecs/systems/MoveRandomSystem.js";

export default class ServerGame {
	constructor() {
		// SETUP
		const ecsManager = new ECSManager();
		// // ADD ENTITIES
		// for (let i = 0; i < 250; i++) {
		// 	ecsManager.addEntity(new Position2DComponent(Math.random() * 200 + 250 - 100, Math.random() * 200 + 250 - 100));
		// }
		// // ADD SYSTEMS
		// ecsManager.addSystems(new MoveRandomSystem());
		// function updateLoop() {
		// 	ecsManager.updateSystems();
		// 	console.log("wah");
		// 	requestAnimationFrame(updateLoop);
		// }
		// updateLoop();
		// setInterval(this.gameLoop,1000/60)
	}
	// gameLoop(){

	// }
}
