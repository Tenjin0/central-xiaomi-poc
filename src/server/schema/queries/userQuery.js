const {
    GraphQLID,
    GraphQLString
} = require("graphql")

const {
    userType
} = require("../types")

const userQuery = {
    type: userType,
    args: {
        id: {
            type: GraphQLID
        },
        card_content: {
            name: "card",
            type: GraphQLString
        }
    },
    resolve: (parent, args) => {
        console.log(parent, args)
        return []
    }
}

module.exports = userQuery;
