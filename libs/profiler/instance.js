const Inspector = require("inspector-api");

// https://github.com/wallet77/v8-inspector-api#configstorage
const inspector = new Inspector({
  storage: {
    type: "fs",
    dir: "./",
  },
});

inspector.profiler.enable();

module.exports = inspector;
