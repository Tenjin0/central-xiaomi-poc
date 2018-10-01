const {
    GraphQLObjectType,
    GraphQLInt
} = require("graphql")

const userType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: {
            type: GraphQLInt
        },
        first_name: {
            type: GraphQLString
        },
        last_name: {
            type: GraphQLString
        },
        card_content: {
            type: GraphQLString
        }
    })
})

module.exports = userType