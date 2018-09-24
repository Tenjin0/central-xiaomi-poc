const express = require("express")
var path = require("path")
var models = require('./database/models');


models.sequelize.sync({ force: false,logging: console.log, alter: false }).then(function() {
    
    const app = express()
    var http = require('http').Server(app);
    var io = require('socket.io')(http);
    var nc = require("./socket")(io, models);

    app.use((req, res, next) => {
        req.models = models
        req.nc = nc;
        next()
    })
    
    require("./routes")(app)

    const listener = http.listen(3001, () => {
        console.log(`Server is running on http://localhost:${listener.address().port} or http://127.0.0.1:${listener.address().port}`);
    })
})

