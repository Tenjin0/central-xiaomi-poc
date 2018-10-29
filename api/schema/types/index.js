const userType = require('./userTypes');
const cameraType = require('./cameraTypes');

module.exports = {
	...userType,
	...cameraType,
};
