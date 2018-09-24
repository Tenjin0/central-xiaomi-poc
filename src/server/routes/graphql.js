const ExpressGraphQL = require("express-graphql");

const {
    NODE_ENV
} = process.env;

module.exports = function (app) {
    // const schema = require('../schema');

    const schema = new GraphQLSchema({});

    app.use("/graphql", ExpressGraphQL({
        schema: schema,
        graphiql: NODE_ENV === "development"
    }));
}