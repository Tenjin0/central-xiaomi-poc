
var models = require('./database/models');

models.sequelize.sync({ force: false,logging: console.log, alter: false }).then(function() {

    require("./middleware/server")
})