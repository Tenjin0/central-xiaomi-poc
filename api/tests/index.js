const path = require("path");

const test = {
	development: {
		dialect: 'sqlite',
		getName() {
			return test.storeImagePath;
		},
	},
	test: {
		dialect: 'sqlite',
		storage: ':memory',
	},
	production: {
		dialect: 'sqlite',
	},
	storeImagePath: process.env.cameraPath || 'public/camera',
};
const imagePath = "public/camera";
const dateTime = new Date();
console.log(dateTime.toLocaleTimeString().replace(/:/g, ''));
console.log(dateTime.toLocaleDateString().replace(/-/g, ''));
const folderInstanceCamera = path.join(imagePath, `${dateTime.toLocaleDateString().replace(/-/g, '')}-${dateTime.toLocaleTimeString().replace(/:/g, '')}`);


console.log(folderInstanceCamera);
