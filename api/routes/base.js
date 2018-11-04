module.exports = function baseRoute(app) {

	app.get('/', (req, res) => {

		res.status(200);

		// eslint-disable-next-line no-underscore-dangle
		const allRoutes = app._router.stack // registered routes
			.filter(r => r.route) // take out all the middleware
			.map(r => ({
				path: r.route.path,
				method: r.route.methods,
			})); // get all the paths

		res.send({
			// eslint-disable-next-line no-underscore-dangle
			routes: allRoutes,
		});

	});

};
