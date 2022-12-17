import InputManager from "./InputManager";

export {};
console.log("alsdkjasjldk");

const ws = new WebSocket("ws://localhost:8080/"); //!@#!@#!@# CHANGE LATER
setTimeout(() => {
	ws.send("client says hi");
}, 1000);

ws.addEventListener("message", (e) => {
	console.log(e.data);
});

const inputManager = new InputManager();
