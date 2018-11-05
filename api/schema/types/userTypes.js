const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
} = require('graphql');

const UserType = new GraphQLObjectType({
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
		card_data: {
			type: GraphQLString,
		},
		created_at: {
			type: GraphQLString,
		},
	}),
});

module.exports = { UserType };
