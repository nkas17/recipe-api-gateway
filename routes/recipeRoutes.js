const express = require('express');
const router = express.Router();
const request = require('request-promise');
const auth = require('basic-auth');
const { baseUrl, mLabKey, url } = require('../config');

router.get('/',(req, res) => {
	request.get({
		url,
	}).then((data)=>{
		res.send(data);
	})
});

router.post('/',(req, res) => {
	const credentials = auth(req)
  // if (!credentials || !(credentials.name === process.env.USER && credentials.pass === process.env.USER_PW)) {
  //   res.statusCode = 401
  //   res.setHeader('WWW-Authenticate', 'Basic realm="allow access"')
  //   res.end('Access denied')
  // } else {
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
  // }
});

router.delete('/:recipeId',(req, res) => {
	// const credentials = auth(req)
  // if (!credentials || !(credentials.name === process.env.USER && credentials.pass === process.env.USER_PW)) {
  //   res.statusCode = 401
  //   res.setHeader('WWW-Authenticate', 'Basic realm="allow access"')
  //   res.end('Access denied')
  // } else {
    request.delete({
  		url: `${baseUrl}/${req.params.recipeId}?apiKey=${mLabKey}`,
  	}).then((data)=>{
      console.log(data);
  		res.send(data);
  	}).catch((error)=> {
      console.log(error);
      res.status(error.statusCode).send({
        status:error.statusCode,
        message: error.message,
      });
    })
  // }

});

module.exports = router;
