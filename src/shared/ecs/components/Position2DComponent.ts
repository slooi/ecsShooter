import { Component } from "../../../packages/ecs";

export default class Position2DComponent extends Component {
	private _x: number;
	public get x(): number {
		return this._x;
	}
	public set x(value: number) {
		this._x = value;
	}
	private _y: number;
	public get y(): number {
		return this._y;
	}
	public set y(value: number) {
		this._y = value;
	}
	constructor(x: number, y: number) {
		super();
		this._x = x;
		this._y = y;
	}
}
