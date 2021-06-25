const fastify = require("fastify");
const WebSocket = require("ws");
const path = require("path");

const app = fastify();
const PORT = 3001;

app.register(require("fastify-static"), {
  root: path.join(__dirname, "public"),
  prefix: "/public/", // optional: default '/'
});
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

  res
    .status(200)
    .header("Access-Control-Allow-Origin", "*")
    .send({ message: "success", data: "CPU profling started ..." });
});

app.get("/stop", (_req, res) => {
  app.websocketServer.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send("stop_cpu_profiling");
    }
  });

  res
    .status(200)
    .header("Access-Control-Allow-Origin", "*")
    .send({ message: "success", data: "CPU profling stopped ..." });
});


// UI  Dashboard
app.get("/", function (_req, reply) {
  return reply.sendFile("index.html"); // serving path.join(__dirname, 'public', 'index.html') directly
});

// 404
app.all("/*", (_request, reply) => {
  reply
    .code(404)
    .header("Access-Control-Allow-Origin", "*")
    .send({ message: "failed", data: null });
});

app.listen(PORT, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  console.info(`listening on port ${PORT}`);
});
