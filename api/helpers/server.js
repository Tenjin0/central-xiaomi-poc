const express = require('express');

const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const io = require('socket.io')(http);
const models = require('../database/models');

const nc = require('./socket')(io, models);
const logger = require('./logger');

app.use(bodyParser.urlencoded({
	extended: true,
}));

app.use(bodyParser.json());

app.use((req, res, next) => {

	req.models = models;
	req.nc = nc;
	next();

});

app.use((req, res, next) => {

	const log = logger.loggerInstance.child({
		id: req.id,
		body: req.body,
	}, true);
	log.info({
		req,
	});
	next();

});

app.use((req, res, next) => {

	function afterResponse() {

		res.removeListener('finish', afterResponse);
		res.removeListener('close', afterResponse);
		const log = logger.loggerInstance.child({
			id: req.id,
		}, true);
		log.info({
			res,
		}, 'response');

	}

	res.on('finish', afterResponse);
	res.on('close', afterResponse);
	next();

});

require('../routes')(app);

const listener = http.listen(3001, () => {

	console.log(`Server is running on http://localhost:${listener.address().port} or http://127.0.0.1:${listener.address().port}`);

});

module.exports = function getApp() {

	return app;

};
