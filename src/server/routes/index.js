const graphql = require('./graphql');

module.exports = (app) => {
	// require('./auth')(app);
	graphql(app);
};
