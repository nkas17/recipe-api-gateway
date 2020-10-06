require('dotenv').config();

const mongoUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.59wyw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

module.exports = {
	isProdEnv: process.env.NODE_ENV === 'production',
	port: process.env.PORT || 3000,
	user: process.env.USER,
	password: process.env.USER_PW,
	jwtKey: process.env.JWT_KEY,
	mongoUrl,
};
