const express = require('express');
const router = express.Router();
const auth = require('basic-auth');
const jwt = require('jsonwebtoken');
const { jwtKey, user, password } = require('../config');

router.post('/login', function(req, res) {
        /*
         * Check if the username and password is correct
         */
        if( req.body.user === user && req.body.password === password ) {
          const id = Math.round(Math.random()*10);
          const jwtPayload = {
              id,
          };
          const jwtOptions = { expiresIn: 3600   };

          const data = jwt.sign(jwtPayload, jwtKey, jwtOptions );
          const buff = new Buffer(data);
          const base64data = buff.toString('base64');

          res.json({
              id,
              user,
              token: base64data,
          });
        } else {
            /*
             * If the username or password was wrong, return 401 ( Unauthorized )
             * status code and JSON error message
             */
            res.status(401).json({
                error: {
                    message: 'Wrong username or password!'
                }
            });
        }
    });

module.exports = router;
