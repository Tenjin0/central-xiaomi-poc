const fs = require('fs').promises;
const path = require('path');
const moment = require('moment');

const {
	storeImagePath,
} = require('../config');
const {
	Camera,
} = require('../database/models');

async function findAllUnregisteredCameraFolder() {

	const batchToInsert = [];

	try {

		const cameraDir = path.join(__dirname, '..', storeImagePath);
		const cameraFolders = await fs.readdir(cameraDir);

		// eslint-disable-next-line for-direction
		for (let i = cameraFolders.length - 1; i >= 0; i--) {

			const cameraFolder = cameraFolders[i];
			const cameraFolderToTest = path.join(cameraDir, cameraFolder);
			// eslint-disable-next-line no-await-in-loop
			const stat = await fs.lstat(cameraFolderToTest);

			if (stat.isDirectory()) {

				// eslint-disable-next-line no-await-in-loop
				const imageFiles = await fs.readdir(cameraFolderToTest);
				if (imageFiles.length > 0) {

					const date = moment(cameraFolder, 'x');
					const cameraInstance = {
						path: cameraFolderToTest,
						created_at: date.format('YYYY-MM-DD HH:mm:ss.SSS'),
					};
					// eslint-disable-next-line no-await-in-loop
					const result = await Camera.find({
						where: cameraInstance,
						attributes: ['id'],
					});
					if (!result) {

						batchToInsert.push(cameraInstance);

					}

				} else {

					fs.rmdir(cameraFolderToTest);

				}

			}

		}

	} catch (e) {

		console.log(e);

	}
	return batchToInsert;

}

module.export = findAllUnregisteredCameraFolder();
