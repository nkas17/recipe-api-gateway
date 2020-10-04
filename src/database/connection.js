const mongoose = require('mongoose');
const { mongoUrl } = require('../../config');

const mono = mongoose
	.connect(mongoUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	// eslint-disable-next-line no-console
	.then(() => console.log('connected to', process.env.DB_NAME));

module.exports = {
	mono,
};
