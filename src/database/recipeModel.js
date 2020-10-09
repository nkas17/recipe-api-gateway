const mongoose = require('mongoose');

const { Schema } = mongoose;

const Recipe = mongoose.model(
	'recipe',
	new Schema({
		title: { type: String },
		description: { type: String },
		category: { type: String },
		id: { type: String },
		ingredients: { type: String },
		directions: { type: String },
	})
);

module.exports = {
	Recipe,
};
