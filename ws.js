const fastify = require("fastify");
const WebSocket = require("ws");
const app = fastify();

const PORT = 3001;

app.register(require("fastify-websocket"), {
  options: { maxPayload: 1048576 },
});

app.get(
  "/ws",
  { websocket: true },
  (connection /* SocketStream */, req /* FastifyRequest */) => {
    connection.socket.on("message", (message) => {
      if (message === "start_cpu_profiling") {
        app.websocketServer.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });
      }
    });
  }
);

app.get("/start", (_req, res) => {
  app.websocketServer.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send("start_cpu_profiling");
    }
  });

  res.status(200).send("Cpu profling started ...");
});

app.get("/stop", (_req, res) => {
  app.websocketServer.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send("stop_cpu_profiling");
    }
  });

  res.status(200).send("Cpu profling stopped ...");
});

// 404
app.all("/*", (_request, reply) => {
  reply.code(404).send({ msg: "404 not found", data: null });
});

app.listen(PORT, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  console.info(`listening on port ${PORT}`);
});
