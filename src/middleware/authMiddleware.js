const jwt = require('jsonwebtoken');
const { jwtKey } = require('../../config');

module.exports = (req, res, next) => {
  /*
   * Check if authorization header is set
   */
  // eslint-disable-next-line no-console
  console.log(req.method);
  if (req.method !== 'OPTIONS') {
    if (
      // eslint-disable-next-line no-prototype-builtins
      req.hasOwnProperty('headers') &&
      // eslint-disable-next-line no-prototype-builtins
      req.headers.hasOwnProperty('authorization')
    ) {
      try {
        /*
         * Try to decode & verify the JWT token
         * The token contains user's id ( it can contain more information )
         * and this is saved in req.user object
         */
        const data = req.headers.authorization.split('Bearer ')[1];
        const buff = Buffer.from(data, 'base64');
        const token = buff.toString('ascii');
        req.user = jwt.verify(token, jwtKey);
      } catch (err) {
        /*
         * If the authorization header is corrupted, it throws exception
         * So return 401 status code with JSON error message
         */
        return res.status(401).json({
          error: {
            msg: 'Failed to authenticate token!',
          },
        });
      }
    } else {
      /*
       * If there is no authorization header, return 401 status code with JSON
       * error message
       */
      return res.status(401).json({
        error: {
          msg: 'No token!',
        },
      });
    }
  }
  return next();
};
