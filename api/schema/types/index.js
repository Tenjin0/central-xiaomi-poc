const userType = require('./userTypes');
const cameraType = require('./cameraTypes');
const pageInfoType = require('./pageInfoTypes');

module.exports = {
	...userType,
	...cameraType,
	...pageInfoType,
};
