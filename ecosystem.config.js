module.exports = {
  apps: [

	{
		name: 'CENTRAL',
		script: './api/index.js',
		ignore_watch: ['node_modules', './api/public', './api/central.db', './api/central.db-journal'],
		watch: ['./api/index.js', './api/controllers', './api/database', './api/helpers', './api/routes', './api/schema'],
		watch_options: {
			followSymlinks: false,
		},
		env: {
			NODE_ENV: 'development',
		},
	},
    {
      name: 'CLIENT',
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
