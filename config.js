
require('dotenv').config();

const db = process.env.NODE_ENV === 'production' ? 'recipes' : 'recipes-test';
const baseUrl = `https://api.mlab.com/api/1/databases/${db}/collections/recipes`;
const mLabKey = process.env.MLAB_KEY;

module.exports = {
  baseUrl,
  isProdEnv: process.env.NODE_ENV === 'production',
  mLabKey,
  port: process.env.PORT || 3000,
  url: `${baseUrl}?apiKey=${mLabKey}`,
  user: process.env.USER,
  password: process.env.USER_PW,
  jwtKey: process.env.JWT_KEY
};
