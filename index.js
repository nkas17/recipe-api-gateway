const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// eslint-disable-next-line no-unused-vars
const { mono } = require('./src/database/connection');
const { Recipe } = require('./src/database/recipeModel');

const { isProdEnv, port } = require('./config');

const app = express();

const userRoutes = require('./src/routes/userRoutes');
const healthRoutes = require('./src/routes/healthRoutes');
const recipeRoutes = require('./src/routes/recipeRoutes');

const authMiddleware = require('./src/middleware/authMiddleware');

app.use(morgan('combined'));

app.use(bodyParser.json());

app.use(cookieParser());

app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Origin',
    isProdEnv ? 'https://food.nathanmweller.com' : 'http://localhost:3001',
  );
  res.header('Vary', 'Origin');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/recipe/', authMiddleware);

app.get('/ping', (req, res) => res.send('pong'));

app.use('/user', userRoutes);
app.use('/health', healthRoutes);
app.use('/recipe', recipeRoutes);

app.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    return res.send(recipes);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('ERROR', err);
    return res.send({});
  }
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`recipe-api-gateway listening on port ${port}!`);
});
