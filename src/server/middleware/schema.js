const {
    GraphQLObjectType,
    GraphQLSchema,
} = require('graphql');


module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation : Mutation
})