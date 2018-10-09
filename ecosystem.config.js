module.exports = {
  apps: [

    // First application
    {
      name: 'CENTRAL',
      script: "./client/index.js",
      "ignore_watch": ["node_modules"],
      "watch_options": {
        "followSymlinks": false
      },
      "env": {
        "NODE_ENV": "development"
      }
    }
  ]
};
