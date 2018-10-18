const { Op } = require('sequelize');
const path = require('path');

const config = {
	dbFile: 'central.db',
	storeImagePath: process.env.cameraPath || 'public/camera',
};
const database = {
	development: {
		dialect: 'sqlite',
		storage: path.join(__dirname, config.dbFile),
		operatorsAliases: Op,
	},
	test: {
		dialect: 'sqlite',
		storage: ':memory',
		operatorsAliases: Op,
	},
	production: {
		dialect: 'sqlite',
		storage: path.join(__dirname, config.dbFile),
		operatorsAliases: Op,
	},
};

config.database = database;

module.exports = config;
