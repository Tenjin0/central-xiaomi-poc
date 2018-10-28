const ExpressGraphQL = require('express-graphql');
const schema = require('../schema');


module.exports = function graphqlRoute(app) {

	app.use('/graphql', (req, res, next) => {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
		if (req.method === 'OPTIONS') {
			res.sendStatus(200);
		} else {
			next();
		}
	});

	app.use('/graphql', ExpressGraphQL({
		schema,
		graphiql: true,
	}));
};
