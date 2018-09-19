var path = require("path")
var processName = path.basename(process.argv[1]);
var indexPath = "./server/index.js"

if (processName === "pm2-dev") {
  indexPath = path.join("src", indexPath)
}

module.exports = {
  apps : [

    // First application
    {
      name      : 'CENTRAL',
      script    : indexPath,
      "error_file": "/dev/stderr",
      "out_file": "/dev/stdout",
      "ignore-watch" : [".git", "ecosystem.config.js"]
    }
  ]
};
