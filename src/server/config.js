const { Op } = require('sequelize');
const path = require('path');

module.exports = {
	development: {
		dialect: 'sqlite',
		storage: path.join(__dirname, './central.db'),
		operatorsAliases: Op,
	},
	test: {
		dialect: 'sqlite',
		storage: ':memory',
		operatorsAliases: Op,
	},
	production: {
		dialect: 'sqlite',
		storage: path.join(__dirname, './central.db'),
		operatorsAliases: Op,
	},
};
