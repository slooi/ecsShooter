import { KeyCodes } from "../../types";

type KeysDown = {
	[key in KeyCodes]?: boolean;
};

export default class InputManager {
	private _keysDown: KeysDown;
	public get keysDown(): KeysDown {
		return this._keysDown;
	}
	constructor() {
		this._keysDown = {
			"": false,
		};
		setupEventListeners(this._keysDown);
	}
}

function setupEventListeners(keysDown: KeysDown) {
	window.addEventListener("keydown", (e) => {
		const keyCode = e.code as KeyCodes;
		keysDown[keyCode] = true;
		console.log("down: " + keyCode);
		console.log(keysDown);
	});
	window.addEventListener("keyup", (e) => {
		const keyCode = e.code as KeyCodes;
		keysDown[keyCode] = false;
		console.log("up: " + keyCode);
		console.log(keysDown);
	});
}
