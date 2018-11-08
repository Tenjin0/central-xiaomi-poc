const bodyParser = require('body-parser');
const express = require('express');
const addRequestId = require('express-request-id')();
const logger = require('./logger');
const { PUBLIC_FOLDER } = require('../config');

module.exports = (app) => {

	app.use(addRequestId);
	app.use('/static', express.static(PUBLIC_FOLDER));

	app.use('/static', (req, res) => {

		res.end();

	});

	app.use(bodyParser.urlencoded({
		extended: true,
	}));

	app.use(bodyParser.json());

	app.use((req, res, next) => {

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
			// res.removeListener('close', afterResponse);
			const log = logger.loggerInstance.child({
				id: req.id,
			}, true);
			log.info({
				res,
			}, 'response');

		}

		res.on('finish', afterResponse);
		// res.on('close', afterResponse);
		next();

	});

};
