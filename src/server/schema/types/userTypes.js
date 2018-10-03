const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
} = require('graphql');

const userType = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		id: {
			type: GraphQLID,
		},
		first_name: {
			type: GraphQLString,
		},
		last_name: {
			type: GraphQLString,
		},
		card_content: {
			type: GraphQLString,
		},
	}),
});

module.exports = { userType };
