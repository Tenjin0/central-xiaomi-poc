const {
	Op,
} = require('sequelize');
const path = require('path');


const config = {
	CAMERAID: process.env.cameraId || 0,
	DB_FILE: 'central.db',
	defaultPerPage: 10,
	DELAY_RED_COLOR: 10000,
	DELAY_ORANGE_COLOR: 10000,
	Op,
	PUBLIC_FOLDER: 'public',
	SCREENSHOT_INTERVAL: 3000,
	STORE_IMAGE_PATH: process.env.cameraPath || 'camera',
};

config.development = {
	dialect: 'sqlite',
	storage: path.join(__dirname, config.DB_FILE),
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
	storage: path.join(__dirname, config.DB_FILE),
	operatorsAliases: Op,
	dialectOptions: {
		useUTC: false, // for reading from database
		dateStrings: true,
		typeCast: true,
	},
	timezone: '+00:00', // for writing to database
};

module.exports = config;
