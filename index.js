const express = require('express');
const bodyParser = require('body-parser');
const request = require('request-promise');
const auth = require('basic-auth');
const morgan = require('morgan');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const mlabKey = process.env.MLAB_KEY;
const isProdEnv = process.env.NODE_ENV === 'production';
const db = isProdEnv ? 'recipes' : 'recipes-test';
const baseUrl = `https://api.mlab.com/api/1/databases/${db}/collections/recipes`;
const url = `${baseUrl}?apiKey=${mlabKey}`;

app.use(morgan('combined'));

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", isProdEnv ? 'https://www.recipes.nathanmweller.com' : 'http://localhost:8080');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


app.get('/ping', (req, res) => res.send('pong'))

app.get('/health',(req, res) => {
  request.get({
		url,
	}).then(()=>{
		res.send("good");
	})
});

app.get('/login', (req, res, next) => {
	const credentials = auth(req)
  if (!credentials || !(credentials.name === process.env.USER && credentials.pass === process.env.USER_PW)) {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="allow access"')
    res.end('Access denied')
  } else {
    res.send("granted");
  }
});

app.get('/recipe',(req, res) => {
	request.get({
		url,
	}).then((data)=>{
		res.send(data);
	})
});

app.post('/recipe',(req, res) => {
	const credentials = auth(req)
  if (!credentials || !(credentials.name === process.env.USER && credentials.pass === process.env.USER_PW)) {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="allow access"')
    res.end('Access denied')
  } else {
  	request.post({
  		url,
  		method: 'POST',
  		body: req.body,
  		json: true,
  		headers: {
  			Accept: 'application/json',
  			'Content-Type': 'application/json',
  		},
  	}).then((data)=>{
  		console.log(data);
  		res.send(data);
  	})
  }
});

app.delete('/recipe/:recipeId',(req, res) => {
	const credentials = auth(req)
  if (!credentials || !(credentials.name === process.env.USER && credentials.pass === process.env.USER_PW)) {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="allow access"')
    res.end('Access denied')
  } else {
    request.delete({
  		url: `${baseUrl}/${req.params.recipeId}?apiKey=${mlabKey}`,
  	}).then((data)=>{
      console.log(data);
  		res.send(`deleted - ${req.params.recipeId}`);
  	}).catch((error)=> {
      console.log(error);
      res.status(error.statusCode).send({
        status:error.statusCode,
        message: error.message,
      });
    })
  }

});

app.listen(port, () => console.log(`recipe-api-gateway listening on port ${port}!`))
