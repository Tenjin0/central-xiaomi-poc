const {
	GraphQLID,
	GraphQLString,
	GraphQLInt,
} = require('graphql');

const {
	cameraType,
	pagination,
} = require('../types');

const {
	Camera,
} = require('../../database/models');

const GraphQLQueryConverter = require('../../helpers/graphQLQueryConverter');

const cameraQuery = {
	type: cameraType,
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
	type: pagination(cameraType),
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

		const gconv = new GraphQLQueryConverter(Camera, args, ast);

		await gconv.generate({
			order: [
				['created_at', 'DESC'],
			],
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
