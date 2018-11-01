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
	sequelize,
} = require('../../database/models');


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
		console.log(args)

		const attributes = Object.keys(Camera.attributes);

		const askData = ast.fieldNodes[0].selectionSet.selections[0].name.value === 'data'
		|| (ast.fieldNodes[0].selectionSet.selections[1] && ast.fieldNodes[0].selectionSet.selections[1].name.value === 'data');

		const askPageInfo = ast.fieldNodes[0].selectionSet.selections[0].name.value === 'pageInfo'
		|| (ast.fieldNodes[0].selectionSet.selections[1] && ast.fieldNodes[0].selectionSet.selections[1].name.value === 'pageInfo');

		let data = null;

		const fields = ast.fieldNodes[0].selectionSet.selections[0].selectionSet.selections
			.map(selection => selection.name.value)
			.filter(attribute => attributes.indexOf(attribute) >= 0);

		if (askData) {
			data = await Camera.findAll({
				attributes: fields,
				order: [
					['created_at', 'DESC'],
				],
			});
		}

		const totalCountDatas = (await Camera.findAll({
			attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'TOTAL_COUNT']],
		}))[0].dataValues.TOTAL_COUNT;

		const pageInfo = {
			totalCountDatas,
		};

		return {
			data,
			pageInfo,
		};
	},
};


module.exports = {
	camerasQuery,
	cameraQuery,
};
