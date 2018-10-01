const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID
} = require("graphql")

const {
    userQuery
} = require("./queries")

const {
    createUser,
    updateUser,
    deleteUser,
  } = require('./mutations');
  
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
    fields: () => ({
        createUser,
        // updateUser,
        // deleteUser
    }),
});
module.exports = new GraphQLSchema({
    query: RootQuery,
    // mutation: RootMutation
})