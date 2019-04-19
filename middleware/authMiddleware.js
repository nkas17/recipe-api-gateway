const jwt = require('jsonwebtoken');
const { jwtKey } = require('../config.js');

module.exports = function(req, res, next) {
    /*
     * Check if authorization header is set
     */
     console.log(req.method);
     if( req.method !== 'OPTIONS' ){
    if( req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization') ) {
        try {
            /*
             * Try to decode & verify the JWT token
             * The token contains user's id ( it can contain more informations )
             * and this is saved in req.user object
             */
             const data = req.headers.authorization.split('Bearer ')[1];
             const buff = new Buffer(data, 'base64');
             const token = buff.toString('ascii');
             req.user = jwt.verify(token, jwtKey );
        } catch(err) {
            /*
             * If the authorization header is corrupted, it throws exception
             * So return 401 status code with JSON error message
             */
            return res.status(401).json({
                error: {
                    msg: 'Failed to authenticate token!'
                }
            });
        }
    } else {

        /*
         * If there is no autorization header, return 401 status code with JSON
         * error message
         */
        return res.status(401).json({
            error: {
                msg: 'No token!'
            }
        });
    }
  }
    next();
    return;
};
