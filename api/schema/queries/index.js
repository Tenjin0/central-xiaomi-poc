const userQuery = require('./userQuery');
const cameraQuery = require('./cameraQuery');

module.exports = {
	...userQuery,
	...cameraQuery,
};
