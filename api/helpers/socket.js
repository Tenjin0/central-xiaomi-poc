const fs = require('fs');
const path = require('path')
const config = require('../config');

module.exports = function centralSocket(io, models) {
	const nxs = io.of('/xiaomisecurity');
	const nc = io.of('/camera');
	const nclients = io.of('/client');

	const imagePath = config.storeImagePath;
	// 	var rawImg = req.body.imageByteArray,
	//     base64Data = rawImg.replace(/^data:image\/png;base64,/, ''),
	//     dirpath = config.root + '/files/Documents/',
	//     imageName = req.body.filename + '.png',
	//     imageLocation = dirpath + imageName;
	//   fs.writeFile(imageLocation, base64Data, 'base64', function(err) {});
	let imageToStore = null;
	const cameraId = 0;

	const saveImage = (folder, indice, arrayBufferImage) => {
		const imagepathToStore = `${folder}/${indice}.png`;
		console.log(imagepathToStore);
		fs.writeFile(imagepathToStore, arrayBufferImage, 'base64', (err) => {
			console.log(err); // writes out file without error, but it's not a valid image
		});
	};

	const storeImagesFromCamera = (socket) => {
		let count = 0;
		const timeout = setInterval(() => {
			console.log('setInterval', count, imageToStore);
			const dateTime = new Date();
			console.log(dateTime.toLocaleTimeString() + dateTime.toLocaleTimeString().replace(/:/g, ''));
			console.log(dateTime.toLocaleDateString() + dateTime.toLocaleDateString().replace(/-/g, ''));
			const folderInstanceCamera = path.join(imagePath, `${dateTime.toLocaleDateString().replace(/-/g, '')}-${dateTime.toLocaleTimeString().replace(/:/g, '')}`);


			console.log(folderInstanceCamera)
			fs.mkdir(folderInstanceCamera, (e) => {
				if (!e || (e && e.code === 'EEXIST')) {
					//do something with contents
					saveImage(folderInstanceCamera, count, imageToStore);
				} else {
					//debug
				}
			});

			count += 1;
			if (count > 2) {
				clearTimeout(timeout);
				socket.emit('camera.device.stop', cameraId);
			}
		}, 3000);
	};


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

	nxs.on('central.init', (value) => {
		console.log('nxs', 'central.init', value);
	});

	nxs.on('connection', (socket) => {
		// var wpt = {
		//     status: "offline",
		//     timeout: null,
		//     gateways: []
		// }
		console.log('a user connected');

		socket.on('central.init', () => {
			socket.emit('xiaomihome.device.color', 'all', null, colors.green);
		});

		socket.emit('central.init',
			['xiaomihome.devices', 'xiaomihome.device.color', 'camera.device.start', 'camera.device.stop'],
			['xiaomihome.gateway.read', 'xiaomihome.devices', 'nfc.data', 'camera.device.data']);

		socket.on('xiaomihome.gateway.read', (gtsid, device) => {
			console.log('event', device);
			if (device.model === 'magnet' && device.event === 'open') {
				console.log('A door has been open');
				socket.emit('xiaomihome.device.color', 'all', null, colors.orange);

				setTimeout(() => {
					socket.emit('xiaomihome.device.color', 'all', null, colors.red);

					const camera = {
						deviceid: cameraId,
						fps: 5,
						height: 200,
						width: 200,
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
			console.log('socket');
			socket.to('/client').emit('nfc.data', data);
			nclients.emit('nfc.data', data);
		});

		socket.on('disconnect', () => {
			console.log('user disconnected');
		});
	});

	return nc;
};
