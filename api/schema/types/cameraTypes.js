const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInputObjectType,
	GraphQLID,
} = require('graphql');
const moment = require('moment');

const DateTimeScalar = require('./dateScalarType');
// console.log(DateTimeScalar)
const CameraType = new GraphQLObjectType({
	name: 'Camera',
	fields: () => ({
		id: {
			type: GraphQLID,
		},
		path: {
			type: GraphQLString,
		},
		created_at: {
			type: GraphQLString,
			resolve: source => moment(source.created_at, 'x').toISOString(),
		},
	}),
});

const RangeDateType = new GraphQLInputObjectType({
	name: 'RangeDate',
	fields: () => ({
		min_date: {
			type: DateTimeScalar,
		},
		max_date: {
			type: DateTimeScalar,
		},
	}),
});

module.exports = { CameraType, RangeDateType };
