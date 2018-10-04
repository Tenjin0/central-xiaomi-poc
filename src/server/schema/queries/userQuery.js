const {
	GraphQLID,
	GraphQLString,
	GraphQLList,
} = require('graphql');

const {
	userType,
} = require('../types');

const {
	User,
} = require('../../database/models');

const userQuery = {
	type: userType,
	args: {
		id: {
			type: GraphQLID,
		},
		card_content: {
			name: 'card',
			type: GraphQLString,
		},
	},
	resolve: (parent, args) => User.find({
		where: args,
	}),
};

const usersQuery = {
	type: GraphQLList(userType),
	resolve: (source, args, root, ast) => {
		const fields = ast.fieldNodes[0].selectionSet.selections.map(selection => selection.name.value);
		return User.all({ attributes: fields });
	},
};

module.exports = {
	userQuery,
	usersQuery,
};
