import { ECSManager } from "../../../packages/ecs/ECSManager.js";
import { System } from "../../../packages/ecs/System.js";
import Position2DComponent from "../components/Position2DComponent.js";
import RenderableComponent from "../components/RenderableComponent.js";

export default class RendererSystem extends System {
	canvas: HTMLCanvasElement;
	c: CanvasRenderingContext2D;
	constructor(canvas: HTMLCanvasElement) {
		super();
		this.canvas = canvas;

		const c = canvas.getContext("2d");
		if (!c) throw new Error("ERROR: could not create 2d context");
		this.c = c;
	}
	update(ecsManager: ECSManager): void {
		const entities = ecsManager.view(Position2DComponent, RenderableComponent);

		this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);
		entities.forEach((entity) => {
			const positionComponent = entity[1].get(Position2DComponent);
			const x = positionComponent.x;
			const y = positionComponent.y;
			this.c.beginPath();
			this.c.arc(x, y, 15, 0, Math.PI * 2);
			this.c.stroke();
		});
	}
}
