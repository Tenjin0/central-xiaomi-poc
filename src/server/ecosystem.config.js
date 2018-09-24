module.exports = {
  apps: [

    // First application
    {
      name: 'CENTRAL',
      script: "./index.js",
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