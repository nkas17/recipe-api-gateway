const express = require('express');
const bodyParser = require('body-parser');
const request = require('request-promise');
const morgan = require('morgan');
const cookieParser = require('cookie-parser')

const { isProdEnv, port, url } = require('./config');

const app = express();

const userRoutes = require('./routes/userRoutes');
const healthRoutes = require('./routes/healthRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

const authMiddleware = require('./middleware/authMiddleware');

app.use(morgan('combined'));

app.use(bodyParser.json());

app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", isProdEnv ? 'https://www.recipes.nathanmweller.com' : 'http://localhost:8080');
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

app.get('/recipes',(req, res) => {
	request.get({
		url,
	}).then((data)=>{
		res.send(data);
	})
});


app.listen(port, () => console.log(`recipe-api-gateway listening on port ${port}!`))
