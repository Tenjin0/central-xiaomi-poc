const bunyan = require('bunyan');
const bunyanSerializer = require('bunyan-express-serializer');

exports.loggerInstance = bunyan.createLogger({
	name: 'transaction-notifier',
	serializers: {
		req: bunyanSerializer,
		res: bunyan.stdSerializers.res,
		err: bunyan.stdSerializers.err,
	},
	level: 'info',
});

exports.logResponse = function logResponse(id, body, statusCode) {

	const log = this.loggerInstance.child({
		id,
		body,
		statusCode,
	}, true);
	log.info('response');

};
