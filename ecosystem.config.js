module.exports = {
  apps: [

    // First application
    {
      name: 'CENTRAL',
      script: "./src/server/index.js",
      "ignore_watch": ["node_modules", "public", "central.db", "central.db-journal", "/src/server/central.db"],
      "watch_options": {
        "followSymlinks": false
      },
      "env": {
        "NODE_ENV": "development"
      }
    }
  ]
};
