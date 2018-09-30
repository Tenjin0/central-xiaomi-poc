const ExpressGraphQL = require("express-graphql");
const schema = require('../schema');

const {
    NODE_ENV
} = process.env;

module.exports = function (app) {


    app.use("/graphql", ExpressGraphQL({
        schema: schema,
        graphiql: NODE_ENV === "development"
    }));
}