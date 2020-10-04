const express = require('express');

const router = express.Router();
const request = require('request-promise');
const { url } = require('../../config');

router.get('/', (req, res) => {
	request
		.get({
			url,
		})
		.then(() => {
			res.send('good');
		});
});

module.exports = router;
