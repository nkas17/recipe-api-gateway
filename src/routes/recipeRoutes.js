const express = require('express');

const router = express.Router();
const { Recipe } = require('../database/recipeModel');

router.post('/', async (req, res) => {
  // eslint-disable-next-line no-console
  console.log('request body', req.body);
  const recipe = new Recipe(req.body);
  try {
    const savedRecipe = await recipe.save();
    // eslint-disable-next-line no-console,no-underscore-dangle
    console.log('saved recipe id', savedRecipe._id);
    return res.send(savedRecipe);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('ERROR', err);
    return res.send({});
  }
});

router.patch('/', (req, res) =>
  // eslint-disable-next-line no-console
  // console.log('request body', req.body);
  Recipe.findOneAndUpdate(
    // eslint-disable-next-line no-underscore-dangle
    { _id: req.body._id },
    {
      category: req.body.category,
      description: req.body.description,
      directions: req.body.directions,
      id: req.body.id,
      ingredients: req.body.ingredients,
      title: req.body.title,
    },
    { new: true },
  ).then((recipe) => {
    // eslint-disable-next-line no-console
    console.log('updated recipe ', recipe.id);
    return res.send(recipe);
  }),
);

router.delete('/:recipeId', async (req, res) => {
  // eslint-disable-next-line no-console
  console.log('recipe id to delete', req.params.recipeId);
  try {
    const { deletedCount } = await Recipe.deleteOne({
      _id: req.params.recipeId,
    });
    // eslint-disable-next-line no-console
    console.log(`deleted ${deletedCount} recipe id`, req.params.recipeId);
    return res.send({ _id: req.params.recipeId });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('ERROR', err);
    return res.send({});
  }
});

module.exports = router;
