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
