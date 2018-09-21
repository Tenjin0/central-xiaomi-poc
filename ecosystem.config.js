var path = require("path")
var processName = path.basename(process.argv[1]);
var indexPath = "./server/index.js"

if (processName !== "pm2-docker") {
    indexPath = path.join("src", indexPath)
}

if (!process.env.HOST_IP) {
  process.env.HOST_IP = "127.0.0.1"
}

module.exports = {
  apps : [

    // First application
    {
      name      : 'CENTRAL',
      script    : indexPath,
      "ignore-watch" : [".git"],
      "env" : {
        "NODE_ENV": process.env.HOST_IP
      }
    }
  ]
};
