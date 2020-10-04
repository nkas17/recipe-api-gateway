const express = require('express');

const router = express.Router();
const { RecipeModel } = require('../database/recipeModel');

router.post('/', (req, res) => {
	// eslint-disable-next-line no-console
	console.log('request body', req.body);
	const recipe = new RecipeModel(req.body);
	recipe.save((err, savedRecipe) => {
		if (err) {
			// eslint-disable-next-line no-console
			console.log('ERROR', err);
			return res.send({});
		}
		// eslint-disable-next-line no-console
		console.log('saved recipe id', savedRecipe._id);
		return res.send(savedRecipe);
	});
});

router.delete('/:recipeId', (req, res) => {
	// eslint-disable-next-line no-console
	console.log('recipe id to delete', req.params.recipeId);
	RecipeModel.deleteOne({ _id: req.params.recipeId }, (err) => {
		if (err) {
			// eslint-disable-next-line no-console
			console.log('ERROR', err);
			return res.send({});
		}
		// eslint-disable-next-line no-console
		console.log('deleted recipe id', req.params.recipeId);
		return res.send({ _id: req.params.recipeId });
	});
});

module.exports = router;
