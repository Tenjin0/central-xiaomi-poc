const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
} = require('graphql');

const cameraType = new GraphQLObjectType({
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
		},
	}),
});

module.exports = { cameraType };
