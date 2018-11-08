const fs = require('fs').promises;
const path = require('path');
const moment = require('moment');

const {
	publicFolder,
	storeImagePath,
} = require('../config');
const {
	Camera,
} = require('../database/models');

async function findAllUnregisteredCameraFolder() {

	const batchToInsert = [];

	try {

		const publicDir = path.join(__dirname, '..', publicFolder);

		const cameraFolders = await fs.readdir(path.join(publicDir, storeImagePath));

		for (let i = 0; i < cameraFolders.length; i++) {

			const cameraFolder = cameraFolders[i];
			const cameraFolderToTest = path.join(storeImagePath, cameraFolder);
			const fullCameraPath = path.join(publicDir, cameraFolderToTest);
			// eslint-disable-next-line no-await-in-loop
			const stat = await fs.lstat(fullCameraPath);

			if (stat.isDirectory()) {

				// eslint-disable-next-line no-await-in-loop
				const imageFiles = await fs.readdir(fullCameraPath);
				if (imageFiles.length > 0) {

					const date = moment(cameraFolder, 'x');
					const cameraInstance = {
						path: cameraFolderToTest,
						created_at: date.format('YYYY-MM-DD HH:mm:ss.SSS'),
					};
					console.log(cameraInstance);
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

async function seedCameraFromFolder() {

	const data = await findAllUnregisteredCameraFolder();
	await Camera.bulkCreate(data);

}
module.export = findAllUnregisteredCameraFolder();

if (require.main === module) {

	seedCameraFromFolder().then(() => {

		console.log('done');

	}).catch((e) => {

		console.log(e);

	});

}
