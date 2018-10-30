const {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLBoolean,
	GraphQLList
} = require('graphql');

const pageInfoType = new GraphQLObjectType({
	name: 'PageInfo',
	fields: () => ({
		previousPage: {
			type: GraphQLInt,
		},
		nextPage: {
			type: GraphQLInt,
		},
		hasNextPage: {
			type: GraphQLBoolean,
		},
		per_page: {
			type: GraphQLInt,
		},
		total_pages: {
			type: GraphQLInt,
		},
		total_items: {
			type: GraphQLInt,
		},
	}),
});


const pagination = (itemType) => {
	const name = `${itemType  }sPagination`;
	return new GraphQLObjectType({
		name,
		fields: () => ({
			data: {
				type: GraphQLList(itemType),
			},
			pageInfo: {
				type: pageInfoType,
			},
		}),
	});
};


module.exports = {
	pageInfoType,
	pagination,
};
