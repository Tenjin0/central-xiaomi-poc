module.exports = function centralSocket(io, models) {

	const nxs = io.of('/xiaomisecurity');
	const nc = io.of('/camera');
	const nclients = io.of('/client');

	let imageToStore = null;
	const storeImage = () => {
		let count = 3;
		const timeout = setInterval(() => {
			count--;
			console.log(imageToStore)
			if (count !== 0) {
				clearTimeout(timeout);
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

		socket.emit('central.init', ['xiaomihome.devices', 'xiaomihome.device.color', 'camera.device.start'], ['xiaomihome.gateway.read', 'xiaomihome.devices', 'nfc.data']);

		nxs.on('xiaomihome.gateway.read', (gtsid, device) => {
			if (device.model === 'magnet' && device.event === 'open') {
				socket.emit('xiaomihome.device.color', 'all', null, colors.orange);

				setTimeout(() => {
					socket.emit('xiaomihome.device.color', 'all', null, colors.red);

					const camera = {
						deviceid: 0,
						fps: 5,
						height: 200,
						width: 200,
					};
					socket.emit('camera.device.start', camera);
					storeImage()
				}, 10000);
			}
		});

		socket.on('camera.device.data', (camera) => {
			imageToStore = camera.buffer;
		});

		socket.on('nfc.data', (data) => {
			models.User.find({
				where: {
					card_data: data,
				},
			}).then((user) => {
				if (user) {
					socket.emit('xiaomihome.device.color', 'all', null, colors.green);

					// if (wpt.timeout) {
					//     clearTimeout(wpt.timeout)
					//     wpt.timeout = null
					// }
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

