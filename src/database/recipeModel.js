const mongoose = require('mongoose');

const { Schema } = mongoose;

const Recipe = new Schema({
	title: String,
	description: String,
	category: String,
	id: String,
	ingredients: String,
	directions: String,
});

const RecipeModel = mongoose.model('recipe', Recipe);

module.exports = {
	RecipeModel,
};
