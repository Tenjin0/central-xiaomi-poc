const GraphQL = require('graphql');
// https://www.apollographql.com/docs/graphql-tools/scalars.html
const DateTimeScalar = new GraphQL.GraphQLScalarType({
	name: 'DateTime',
	description: 'An ISO-8601 encoded UTC date string.',
	serialize: (value) => {

		console.log('serialize', value);
		return value;

	},
	parseValue: (value) => {

		console.log('serialize', value);
		return value;

	},
	parseLiteral: (value) => {

		console.log('serialize', value);
		return value;

	},
});

module.exports = DateTimeScalar;
