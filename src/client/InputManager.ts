import { KeyCodes } from "../../types";

type KeysDown = {
	[key in KeyCodes]?: boolean;
};

export default class InputManager {
	keysDown: KeysDown;
	constructor() {
		this.keysDown = {
			"": false,
		};
		setupEventListeners(this.keysDown);
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
