const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// eslint-disable-next-line no-unused-vars
const { mono } = require('./src/database/connection');
const { RecipeModel } = require('./src/database/recipeModel');

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
		isProdEnv ? 'https://recipes.nathanmweller.com' : 'http://localhost:8080'
	);
	res.header('Vary', 'Origin');
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});

app.use('/recipe/', authMiddleware);

app.get('/ping', (req, res) => res.send('pong'));

app.use('/user', userRoutes);
app.use('/health', healthRoutes);
app.use('/recipe', recipeRoutes);

app.get('/recipes', (req, res) => {
	RecipeModel.find((err, recipes) => {
		if (err) {
			// eslint-disable-next-line no-console
			console.log(err);
			return res.send({});
		}
		return res.send(recipes);
	});
});

app.listen(port, () => {
	// eslint-disable-next-line no-console
	RecipeModel.find((err, recipes) => console.log(recipes));
	// eslint-disable-next-line no-console
	console.log(`recipe-api-gateway listening on port ${port}!`);
});
