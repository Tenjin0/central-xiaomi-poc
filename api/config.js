const {
	Op,
} = require('sequelize');
const path = require('path');

const config = {
	dbFile: 'central.db',
	storeImagePath: process.env.cameraPath || 'public/camera',
};
config.development = {
	dialect: 'sqlite',
	storage: path.join(__dirname, config.dbFile),
	operatorsAliases: Op,
	dialectOptions: {
		useUTC: false, // for reading from database
		dateStrings: true,
		typeCast: true,
	},
	timezone: '+00:00', // for writing to database
};
config.test = {
	dialect: 'sqlite',
	storage: ':memory',
	operatorsAliases: Op,
	dialectOptions: {
		useUTC: false, // for reading from database
		dateStrings: true,
		typeCast: true,
	},
	timezone: '+00:00', // for writing to database
};
config.production = {
	dialect: 'sqlite',
	storage: path.join(__dirname, config.dbFile),
	operatorsAliases: Op,
	dialectOptions: {
		useUTC: false, // for reading from database
		dateStrings: true,
		typeCast: true,
	},
	timezone: '+00:00', // for writing to database
};

module.exports = config;
