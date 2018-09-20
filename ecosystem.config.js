var path = require("path")
var processName = path.basename(process.argv[1]);
var indexPath = "./server/index.js"

console.log(indexPath, processName)
if (processName === "pm2-dev") {
    indexPath = path.join("src", indexPath)
}

console.log(indexPath)
if (!process.env.HOST_IP) {
  process.env.HOST_IP = "127.0.0.1"
}

module.exports = {
  apps : [

    // First application
    {
      name      : 'CENTRAL',
      script    : indexPath,
      "error_file": "/dev/stderr",
      "out_file": "/dev/stdout",
      "ignore-watch" : [".git", "ecosystem.config.js"],
      "env" : {
        "NODE_ENV": process.env.HOST_IP
      }
    }
  ]
};
