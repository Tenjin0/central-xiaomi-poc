const {
	GraphQLID,
	GraphQLString,
	GraphQLInt,
} = require('graphql');

const {
	userType,
	pagination,
} = require('../types');

const {
	User,
} = require('../../database/models');
const {
	Op,
} = require('../../config');

const GraphQLQueryConverter = require('../../helpers/graphQLQueryConverter');

const userQuery = {
	type: userType,
	args: {
		id: {
			type: GraphQLID,
		},
		card_data: {
			name: 'card',
			type: GraphQLString,
		},
	},
	resolve: (parent, args) => User.find({
		where: args,
	}),
};

const usersQuery = {
	type: pagination(userType),
	args: {
		filter: {
			type: GraphQLString,
		},
		perPage: {
			type: GraphQLInt,
		},
		page: {
			type: GraphQLInt,
		},
		// order: {
		// 	type: LinkOrderByInput,
		// },
	},
	resolve: async (source, args, root, ast) => {

		const gconv = new GraphQLQueryConverter(User, args, ast);
		const filter = args.filter ? {
			[Op.or]: [{
				first_name: {
					[Op.like]: `%${args.filter}%`,
				},
			},
			{
				last_name: {
					[Op.like]: `%${args.filter}%`,
				},
			},
			],
		} : null;
		await gconv.generate({
			filter,
		});

		return {
			data: gconv.data,
			pageInfo: gconv.pageInfo,
		};

	},
};

module.exports = {
	userQuery,
	usersQuery,
};
