import { ECSManager, System } from "../../packages/ecs";
import Position2DComponent from "../components/Position2DComponent";

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
		console.log("UPDATE RENDERERSYSTEM");
		const entities = ecsManager.view(Position2DComponent);

		entities.forEach((entity) => {
			const positionComponent = entity[1].get(Position2DComponent);
			const x = positionComponent.x;
			const y = positionComponent.y;
			this.c.beginPath();
			this.c.arc(x, y, 15, 0, Math.PI * 2);
			this.c.stroke();
			// this.c.closePath();
		});
	}
}
