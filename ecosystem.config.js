var path = require("path")
var processName = path.basename(process.argv[1]);
var indexPath = "./server/index.js"
require('dotenv').load();
if (processName !== "pm2-docker") {
  indexPath = path.join("src", indexPath)
}

console.log(process.env)

module.exports = {
  apps: [

    // First application
    {
      name: 'CENTRAL',
      script: indexPath,
      "ignore_watch": ["node_modules", "public", "central.db", "central.db-journal"],
      "watch_options": {
        "followSymlinks": false
      },
      "env": {
        "NODE_ENV": "development"
      }
    }
  ]
};