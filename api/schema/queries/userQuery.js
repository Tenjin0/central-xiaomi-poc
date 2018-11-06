const {
	GraphQLID,
	GraphQLString,
	GraphQLInt,
} = require('graphql');

const {
	UserType,
	paginationFactory,
} = require('../types');

const { User } = require('../../database/models');
const { Op } = require('../../config');

const GraphQLQueryConverter = require('../../helpers/graphQLQueryConverter');

const userQuery = {
	type: UserType,
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
	type: paginationFactory(UserType),
	args: {
		filter: {
			type: GraphQLString,
		},
		per_page: {
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
			pagination: gconv.pagination,
		};

	},
};

module.exports = {
	usersQuery,
	userQuery,
};
