const models = require('./database/models');
const app = 	require('./helpers/server');

models.sequelize.sync({ force: false, logging: console.log, alter: false }).then(() => {
	app();
});
