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
		const attributes = Object.keys(Camera.attributes);
		let fields = ast.fieldNodes[0].selectionSet.selections[0].selectionSet.selections
			.map(selection => selection.name.value)
			.filter(attribute => attributes.indexOf(attribute) >= 0);
		if (fields.length === 0) {
			fields = null;
		}
		const data = await Camera.findAll({
			attributes: fields,
			order: [
				['created_at', 'DESC'],
			],
		});
			// 	return {data};
		// }).then((data) => {
		// 	console.log(data);
		return {
			data,
			pageInfo: {
			},
		};
		console.log()
	},
};


module.exports = {
	camerasQuery,
	cameraQuery,
};
