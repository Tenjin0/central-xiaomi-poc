const {
	GraphQLID,
	GraphQLString,
	GraphQLList,
} = require('graphql');

const {
	cameraType,
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

const camerasQuery = {
	type: GraphQLList(cameraType),
	resolve: (source, args, root, ast) => {
		const attributes = Object.keys(Camera.attributes);
		const fields = ast.fieldNodes[0].selectionSet.selections
			.map(selection => selection.name.value)
			.filter(attribute => attributes.indexOf(attribute) >= 0);

		return Camera.findAll({
			attributes: fields,
			order: [['created_at', 'DESC']],
		});
	},
};


module.exports = {
	camerasQuery,
	cameraQuery,
};
