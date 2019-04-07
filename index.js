const express = require('express');
const request = require('request-promise');
const auth = require('basic-auth')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const mlabKey = process.env.MLAB_KEY;
const isProdEnv = process.env.NODE_ENV === 'production';
const db = isProdEnv ? 'recipes' : 'recipes-test';
const url = `https://api.mlab.com/api/1/databases/${db}/collections/recipes?apiKey=${mlabKey}`;
 


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", isProdEnv ? 'https://www.recipes.nathanmweller.com' : 'http://localhost:8080');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


app.get('/', (req, res) => res.send('Hello World!'))

app.get('/login', (req, res, next) => {
	const credentials = auth(req)
  if (!credentials || !(credentials.name === process.env.USER && credentials.pass === process.env.USER_PW)) {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="allow access"')
    res.end('Access denied')
  } else {
    res.send("granted");
  }
})

app.get('/recipe',(req, res) => {
	request.get({
		url,
	}).then((data)=>{
		res.send(data);
	})
	
})

app.listen(port, () => console.log(`recipe-api-gateway listening on port ${port}!`))
