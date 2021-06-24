"use strict";

require("./libs/profiler");

const fastify = require("fastify");
const path = require("path");

const meRoute = require("./routes/me");

const app = fastify();
const PORT = 3000;

app.register(require("fastify-static"), {
  root: path.join(__dirname, "public"),
  prefix: "/public/", // optional: default '/'
});

// Registered routes
app.get("/", function (_req, reply) {
  return reply.sendFile("index.html"); // serving path.join(__dirname, 'public', 'index.html') directly
});
app.get("/me", meRoute);

// Fallback routes
app.all("/*", (_request, reply) => {
  reply.code(404).send({ msg: "404 not found", data: null });
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.info(`listening on port ${PORT}`);
});
