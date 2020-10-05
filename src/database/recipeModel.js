const mongoose = require('mongoose');

const { Schema } = mongoose;

const Recipe = mongoose.model(
	'recipe',
	new Schema({
		title: String,
		description: String,
		category: String,
		id: String,
		ingredients: String,
		directions: String,
	})
);

module.exports = {
	Recipe,
};
