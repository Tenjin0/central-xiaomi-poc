const graphql = require('./graphql');
const base = require('./base');

module.exports = (app) => {

	// require('./auth')(app);
	base(app);
	graphql(app);

};
