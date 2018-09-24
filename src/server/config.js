const Sequelize = require("sequelize")
const path = require("path")
const Op = Sequelize.Op;

module.exports = {
    "development": {
        "dialect": "sqlite",
        "storage": path.join(__dirname, "./central.db"),
        "operatorsAliases": Op
    },
    "test": {
        "dialect": "sqlite",
        "storage": ":memory",
        "operatorsAliases": Op
    },
    "production": {
        "dialect": "sqlite",
        "storage": path.join(__dirname, "./central.db"),
        "operatorsAliases": Op
    }
}