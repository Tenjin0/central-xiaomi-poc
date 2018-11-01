const {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLBoolean,
	GraphQLList,
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
		perPage: {
			type: GraphQLInt,
		},
		totalPages: {
			type: GraphQLInt,
		},
		totalCountDatas: {
			type: GraphQLInt,
		},
	}),
});


const pagination = (itemType) => {
	const name = `${itemType}sPagination`;
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
