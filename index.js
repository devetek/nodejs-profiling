"use strict";

require("./libs/profiler");

const fastify = require("fastify");

const meRoute = require("./routes/me");

const app = fastify();
const PORT = 3000;

app.get("/me", meRoute);

// Fallback routes
app.all("/*", (_request, reply) => {
  reply.code(404).send({ msg: "404 not found", data: null });
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.info(`listening on port ${PORT}`);
});
