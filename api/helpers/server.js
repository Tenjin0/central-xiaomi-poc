const express = require('express');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const models = require('../database/models');

require('./socket')(io, models);

require('./middleware')(app);

require('../routes')(app);

const listener = http.listen(3001, () => {

	console.log(`Server is running on http://localhost:${listener.address().port} or http://127.0.0.1:${listener.address().port}`);

});

module.exports = function getApp() {

	return app;

};
