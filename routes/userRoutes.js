const express = require('express');
const router = express.Router();
const auth = require('basic-auth');


router.get('/login', (req, res, next) => {
	const credentials = auth(req)
  if (!credentials || !(credentials.name === process.env.USER && credentials.pass === process.env.USER_PW)) {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="allow access"')
    res.end('Access denied')
  } else {
    res.send("granted");
  }
});


module.exports = router;
