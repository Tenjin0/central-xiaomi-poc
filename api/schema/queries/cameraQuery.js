const {
	GraphQLID,
	GraphQLString,
	GraphQLInt,
} = require('graphql');

const { Op } = require('../../config');

const {
	CameraType,
	RangeDateType,
	paginationFactory,
} = require('../types');

const {
	Camera,
} = require('../../database/models');

const GraphQLQueryConverter = require('../../helpers/graphQLQueryConverter');

const cameraQuery = {
	type: CameraType,
	args: {
		id: {
			type: GraphQLID,
		},
		card_data: {
			name: 'card',
			type: GraphQLString,
		},
	},
	resolve: (parent, args) => Camera.find({
		where: args,
	}),
};


// const LinkOrderByInput = {
// 	id_ASC: 'id_ASC',
// 	id_DESC: 'id_DESC',
// 	created_at_ASC: 'created_at_ASC',
// 	created_at_DESC: 'created_at_DESC',
// };

const camerasQuery = {
	type: paginationFactory(CameraType),
	args: {
		filter: {
			type: RangeDateType,
		},
		perPage: {
			type: GraphQLInt,
		},
		page: {
			type: GraphQLInt,
		},
	},
	resolve: async (source, args, root, ast) => {

		const filter = {
			created_at: {},
		};
		if (args.filter.min_date) {

			filter.created_at = {
				[Op.gte]: args.filter.min_date,
			};

		}
		if (args.filter.max_date) {

			filter.created_at = {
				...filter.created_at,
				[Op.lte]: args.filter.max_date,
			};

		}
		const gconv = new GraphQLQueryConverter(Camera, args, ast);

		await gconv.generate({
			order: [
				['created_at', 'DESC'],
			],
			filter,
		});

		return {
			data: gconv.data,
			pageInfo: gconv.pageInfo,
		};

	},
};


module.exports = {
	camerasQuery,
	cameraQuery,
};
