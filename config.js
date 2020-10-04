require('dotenv').config();

const baseUrl = `https://api.mlab.com/api/1/databases/${process.env.DB_NAME}/collections/recipes`;
const mLabKey = process.env.MLAB_KEY;

module.exports = {
	baseUrl,
	isProdEnv: process.env.NODE_ENV === 'production',
	mLabKey,
	port: process.env.PORT || 3000,
	url: `${baseUrl}?apiKey=${mLabKey}`,
	user: process.env.USER,
	password: process.env.USER_PW,
	jwtKey: process.env.JWT_KEY,
	mongoUrl: `mongodb://${process.env.DB_USER}:${process.env.DB_PW}@ds1${process.env.DB_PORT}.mlab.com:${process.env.DB_PORT}/${process.env.DB_NAME}`,
};
