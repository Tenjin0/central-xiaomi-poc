const {
    GraphQLSchema,
    GraphQLObjectType
} = require("graphql")

const {userQuery } = require("./queries")

const RootQuery = new GraphQLObjectType({
    name: 'rootQuery',
    description: 'This is the root query which holds all possible READ entrypoints for the GraphQL API',
    fields: () => ({
        user: userQuery
    }),
})

const RootMutation = new GraphQLObjectType({
    name: 'rootMutation',
    description: 'This is the root mutation which holds all possible WRITE entrypoints for the GraphQL API',
    fields: () => ({}),
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})