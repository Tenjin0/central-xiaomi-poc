const path = require('path'),
	express = require('express'),
	app = express(),
	port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'development') {

	const webpack = require('webpack'),
		webpackConfig = require('./webpack.config.js');
	let compiler = webpack(webpackConfig);
	app.use(require('webpack-dev-middleware')(compiler, {
		noInfo: true,
		publicPath: webpackConfig.output.publicPath,
		stats: {
			colors: true
		}
	}));

	app.use(require('webpack-hot-middleware')(compiler));

}

app.use(express.static(path.resolve(__dirname, 'dist')));

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(port, function (error) {
	if (error) {
		console.error(error)
	} else {
		console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
	}
})
