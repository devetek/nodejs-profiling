const Inspector = require("inspector-api");
const fs = require("fs");

const PROFILING_DIR = "./profile-result";

if (!fs.existsSync(PROFILING_DIR)) {
  fs.mkdirSync(PROFILING_DIR);
}

// https://github.com/wallet77/v8-inspector-api#configstorage
const inspector = new Inspector({
  storage: {
    type: "fs",
    dir: PROFILING_DIR,
  },
});

inspector.profiler.enable();

module.exports = inspector;
