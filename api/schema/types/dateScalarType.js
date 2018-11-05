const GraphQL = require('graphql');
// https://www.apollographql.com/docs/graphql-tools/scalars.html

const moment = require('moment');

const DateTimeScalar = new GraphQL.GraphQLScalarType({
	name: 'DateTime',
	description: 'An ISO-8601 like date string. Example: "2018-10-10T12:00:00.000Z"',
	serialize: value => value,
	parseValue: value => value,
	parseLiteral: (ast) => {

		if (ast.kind !== 'StringValue') {

			throw new Error('string date format. Example: "2018-10-10T12:00:00.000Z"');

		}
		const date = moment(ast.value);
		if (date.isValid()) {

			return date.toISOString();

		}

		let whereItIsWrong = null;

		switch (date.invalidAt()) {

		case 0:
			whereItIsWrong = 'YEAR';
			break;
		case 1:
			whereItIsWrong = 'MONTH';
			break;
		case 2:
			whereItIsWrong = 'DAY';
			break;
		case 4:
			whereItIsWrong = 'DAY';
			break;
		case 5:
			whereItIsWrong = 'HOUR';
			break;
		case 6:
			whereItIsWrong = 'MINUTE';
			break;
		case 7:
			whereItIsWrong = 'SECOND';
			break;
		case 8:
			whereItIsWrong = 'MILLISECOND';
			break;
		default:
			whereItIsWrong = 'Do not know';

			break;

		}
		throw new Error(`String date format expected. Indice: Wrong at ${whereItIsWrong}. Example: "2018-10-10T12:00:00.000Z"`);

	},
});

module.exports = DateTimeScalar;
