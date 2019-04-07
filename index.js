const express = require('express');
const request = require('request-promise');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const mlabKey = process.env.MLAB_KEY;
const db = process.env.NODE_ENV === 'production' ? 'recipes' : 'recipes-test';
const url = `https://api.mlab.com/api/1/databases/${db}/collections/recipes?apiKey=${mlabKey}`;

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/recipe',(req, res) => {
	request.get({
		url,
	}).then((data)=>{
		res.send(data);
	})
	
})

app.listen(port, () => console.log(`recipe-api-gateway listening on port ${port}!`))
