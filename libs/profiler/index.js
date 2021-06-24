const inspector = require("./instance");

const ReconnectingWebSocket = require("reconnecting-websocket");
const WebSocket = require("ws");

const options = {
  WebSocket: WebSocket, // custom WebSocket constructor
  connectionTimeout: 1000,
  maxRetries: 10,
};

const rws = new ReconnectingWebSocket("ws://localhost:3001/ws", [], options);

rws.onopen = () => {
  console.info("ws connection open!");
};

rws.onmessage = (message) => {
  if (message.data === "connection") {
    console.info("[onmessage]", "Connected to ws server.");
  } else if (message.data === "start_cpu_profiling") {
    inspector.profiler.start();
    console.info("[onmessage]", "Cpu profile started...");
  } else if (message.data === "stop_cpu_profiling") {
    inspector.profiler.stop();
    console.info("[onmessage]", "Cpu profile stopped...");
  }
  console.info("[onmessage]", message.data);
};

rws.reconnect = (code, reason) => {
  console.info("[reconnect]", code, reason);
};

rws.onerror = (event) => {
  console.info("[onerror]", event.message);
};

rws.onclose = (event) => {
  console.info("[onclose]", event.code, event.reason);
};

rws.close = (code, reason) => {
  console.info("[close]", code, reason);
};