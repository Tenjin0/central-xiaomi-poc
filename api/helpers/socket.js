const fs = require('fs');
const path = require('path');
const moment = require('moment');
const {
	CAMERA_ID,
	CAMERA_FPS,
	CAMERA_HEIGHT,
	CAMERA_WIDTH,
	SCREENSHOT_INTERVAL,
	SCREENSHOT_NUMBER,
	STORE_IMAGE_PATH,
} = require('../config');

const {
	Camera,
} = require('../database/models');

const colors = {
	off: {
		r: 0,
		g: 0,
		b: 0,
		i: 0,
	},
	orange: {
		r: 255,
		g: 70,
		b: 0,
		i: 100,
	},
	red: {
		r: 255,
		g: 0,
		b: 0,
		i: 100,
	},
	green: {
		r: 0,
		g: 255,
		b: 0,
		i: 100,
	},
};

module.exports = function centralSocket(io, models) {

	const nxs = io.of('/xiaomisecurity');
	const nc = io.of('/camera');
	const nclients = io.of('/client');

	let imageToStore = null;

	const emitCentralInit = (socket) => {

		socket.emit('central.init',
			['xiaomihome.devices', 'xiaomihome.device.color', 'camera.device.start', 'camera.device.stop'],
			['xiaomihome.gateway.read', 'xiaomihome.devices', 'nfc.data', 'camera.device.data', 'xiaomihome.started']);

	};

	const saveImage = (folder, indice, arrayBufferImage) => {

		const imagepathToStore = `${folder}/${indice}.png`;

		fs.writeFile(imagepathToStore, arrayBufferImage, 'base64');

	};

	const storeImagesFromCamera = (socket) => {

		let count = 0;
		const now = moment();
		const folderInstanceCamera = path.join(STORE_IMAGE_PATH, now.format('x'));

		Camera.create({
			path: folderInstanceCamera,
			created_at: now.format('YYYY-MM-DD HH:mm:ss.SSS'),
		});

		fs.mkdir(folderInstanceCamera, (e) => {

			if (!e || (e && e.code === 'EEXIST')) {

				const timeout = setInterval(() => {

					// do something with contents
					saveImage(folderInstanceCamera, count, imageToStore);
					count += 1;

					if (count >= SCREENSHOT_NUMBER) {

						clearTimeout(timeout);
						socket.emit('camera.device.stop', CAMERA_ID);
						socket.emit('xiaomihome.device.color', 'all', null, colors.green);

					}

				}, SCREENSHOT_INTERVAL);

			}

		});

	};

	nxs.on('central.init', (value) => {

		console.log('nxs', 'central.init', value);

	});

	nxs.on('connection', (socket) => {

		// var wpt = {
		//     status: "offline",
		//     timeout: null,
		//     gateways: []
		// }

		socket.on('central.init', () => {

			socket.emit('xiaomihome.device.color', 'all', null, colors.green);

		});

		socket.on('xiaomihome.started', () => {

			emitCentralInit(socket);

		});

		socket.on('xiaomihome.gateway.read', (gtsid, device) => {

			if (device.model === 'magnet' && device.event === 'open') {

				socket.emit('xiaomihome.device.color', 'all', null, colors.orange);

				setTimeout(() => {

					socket.emit('xiaomihome.device.color', 'all', null, colors.red);

					const camera = {
						deviceid: CAMERA_ID,
						fps: CAMERA_FPS,
						height: CAMERA_HEIGHT,
						width: CAMERA_WIDTH,
					};
					socket.emit('camera.device.start', camera);
					storeImagesFromCamera(socket);

				}, 10000);

			}

		});

		socket.on('camera.device.data', (data) => {

			imageToStore = data.buffer;

		});

		socket.on('nfc.data', (data) => {

			models.User.find({
				where: {
					card_data: data,
				},
			}).then((user) => {

				if (user) {

					socket.emit('xiaomihome.device.color', 'all', null, colors.green);

				}

			});
			socket.to('/client').emit('nfc.data', data);
			nclients.emit('nfc.data', data);

		});

		socket.on('disconnect', () => {

			console.log('user disconnected');

		});

	});

	return nc;

};
