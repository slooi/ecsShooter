import ControllableComponent from "../ecs/components/ControllableComponent";
import Position2DComponent from "../ecs/components/Position2DComponent";
import ControllableSystem from "../ecs/systems/ControllableSystem";
import RendererSystem from "../ecs/systems/RendererSystem";
import { ECSManager } from "../packages/ecs";
import InputManager from "./InputManager";

// WEBSOCKET
const ws = new WebSocket("ws://localhost:8080/"); //!@#!@#!@# CHANGE LATER
setTimeout(() => {
	ws.send("client says hi");
}, 1000);

ws.addEventListener("message", (e) => {
	console.log(e.data);
});

//
const canvas = document.createElement("canvas");
canvas.width = 500;
canvas.height = 500;
document.body.appendChild(canvas);

// SETUP
const inputManager = new InputManager();
const ecsManager = new ECSManager();

// ADD ENTITIES
ecsManager.addEntity(new Position2DComponent(10, 15), new ControllableComponent());
ecsManager.addEntity(new Position2DComponent(10, 150));

// ADD SYSTEMS
ecsManager.addSystems(new ControllableSystem(inputManager), new RendererSystem(canvas));

function updateLoop() {
	ecsManager.updateSystems();

	requestAnimationFrame(updateLoop);
}
updateLoop();
