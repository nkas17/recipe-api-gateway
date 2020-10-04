require('dotenv').config();

module.exports = {
	isProdEnv: process.env.NODE_ENV === 'production',
	port: process.env.PORT || 3000,
	user: process.env.USER,
	password: process.env.USER_PW,
	jwtKey: process.env.JWT_KEY,
	mongoUrl: `mongodb://${process.env.DB_USER}:${process.env.DB_PW}@ds1${process.env.DB_PORT}.mlab.com:${process.env.DB_PORT}/${process.env.DB_NAME}`,
};
