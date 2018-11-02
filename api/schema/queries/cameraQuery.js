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
/**
 * @param {*} ast ast from graphql query
 * @return {object} json object with ressources as keys and array of property for values
 */
const getFields = (ast) => {
	const fields = {};
	for (let i = 0; i < ast.fieldNodes[0].selectionSet.selections.length; i++) {
		const ressource = ast.fieldNodes[0].selectionSet.selections[i];
		fields[ressource.name.value] = [];
		// console.log("ressource", ressource);
		for (let j = 0; j < ressource.selectionSet.selections.length; j++) {
			const property = ressource.selectionSet.selections[j].name.value;
			fields[ressource.name.value].push(property);
		}
	}
	return fields;
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
		const attributes = Object.keys(Camera.attributes);
		const fields = getFields(ast);
		console.log(fields);

		// const askData = ast.fieldNodes[0].selectionSet.selections[0].name.value === 'data' ||
		// 	(ast.fieldNodes[0].selectionSet.selections[1] && ast.fieldNodes[0].selectionSet.selections[1].name.value === 'data');

		// const askPageInfo = ast.fieldNodes[0].selectionSet.selections[0].name.value === 'pageInfo' ||
		// 	(ast.fieldNodes[0].selectionSet.selections[1] && ast.fieldNodes[0].selectionSet.selections[1].name.value === 'pageInfo');

		// let data = null;

		// const fields = ast.fieldNodes[0].selectionSet.selections[0].selectionSet.selections
		// 	.map(selection => selection.name.value)
		// 	.filter(attribute => attributes.indexOf(attribute) >= 0);

		// if (askData) {
		// 	data = await Camera.findAll({
		// 		attributes: fields,
		// 		order: [
		// 			['created_at', 'DESC'],
		// 		],
		// 	});
		// }

		// const totalCountDatas = (await Camera.findAll({
		// 	attributes: [
		// 		[sequelize.fn('COUNT', sequelize.col('id')), 'TOTAL_COUNT']
		// 	],
		// }))[0].dataValues.TOTAL_COUNT;

		// const pageInfo = {
		// 	totalCountDatas,
		// };

		// return {
		// 	data,
		// 	pageInfo,
		// };
	},
};


module.exports = {
	camerasQuery,
	cameraQuery,
};
