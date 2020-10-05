const express = require('express');

const router = express.Router();
const { Recipe } = require('../database/recipeModel');

router.post('/', (req, res) => {
	// eslint-disable-next-line no-console
	console.log('request body', req.body);
	const recipe = new Recipe(req.body);
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

router.patch('/', (req, res) => {
	// eslint-disable-next-line no-console
	console.log('request body', req.body);
	return Recipe.findOneAndUpdate(
		{ _id: req.body._id },
		{
			category: req.body.category,
			description: req.body.description,
			directions: req.body.directions,
			id: req.body.id,
			ingredients: req.body.ingredients,
			title: req.body.title,
		},
		{ new: true }
	).then((recipe) => {
		// eslint-disable-next-line no-console
		console.log('updated recipe ', recipe);
		return res.send(recipe);
	});
});

router.delete('/:recipeId', (req, res) => {
	// eslint-disable-next-line no-console
	console.log('recipe id to delete', req.params.recipeId);
	Recipe.deleteOne({ _id: req.params.recipeId }, (err) => {
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
