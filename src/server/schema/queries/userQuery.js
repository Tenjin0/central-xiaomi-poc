const {
    GraphQLObjectType
} = require("graphql")

const userQuery = new GraphQLObjectType({
    name: "RootQuery"
})

module.exports = userQuery;
