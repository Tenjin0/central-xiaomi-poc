module.exports = {
  apps: [

    // First application
    {
      name: 'CENTRAL',
      script: "./src/server/index.js",
      "ignore_watch": ["node_modules", "public", "./src/server/central.db", "./src/server/central.db-journal"],
      "watch": ["./src/server/index.js", "./src/server/controllers",  "./src/server/database",  "./src/server/helpers", "./src/server/routes",  "./src/server/schema"],
      "watch_options": {
        "followSymlinks": false
      },
      "env": {
        "NODE_ENV": "development"
      }
    }
  ]
};
