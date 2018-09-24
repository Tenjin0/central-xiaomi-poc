const express = require("express")
const app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require("path")
var models = require(path.join(__dirname, './database/models'));
var nc = require("./socket")(io);

app.use(express.static('public'));

app.use((req, res, next) => {

    req.nc = nc;
    next()
})

app.get("/", (req, res) => {

    res.send("Hello World central")
})

models.sequelize.sync({ force: false,logging: console.log, alter: false }).then(function() {

    const listener = http.listen(3001, () => {
        console.log(`Server is running on http://localhost:${listener.address().port} or http://127.0.0.1:${listener.address().port}`);
    })
})

