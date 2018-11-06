const {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLList,
} = require('graphql');

const pageInfoType = new GraphQLObjectType({
	name: 'PageInfo',
	fields: () => ({
		currentPage: {
			type: GraphQLInt,
		},
		previousPage: {
			type: GraphQLInt,
		},
		nextPage: {
			type: GraphQLInt,
		},
		perPage: {
			type: GraphQLInt,
		},
		totalPages: {
			type: GraphQLInt,
		},
		totalDatas: {
			type: GraphQLInt,
		},
	}),
});


const paginationFactory = (itemType) => {

	const name = `${itemType}sPagination`;
	return new GraphQLObjectType({
		name,
		fields: () => ({
			data: {
				type: GraphQLList(itemType),
			},
			pagination: {
				type: pageInfoType,
			},
		}),
	});

};


module.exports = {
	pageInfoType,
	paginationFactory,
};
