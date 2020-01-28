var bcrypt = require("bcryptjs");
var User = require("../models/user.model");
var jwt = require("jsonwebtoken");
var cache = require("memory-cache");
var uuid = require("uuid/v1");

async function getToken(req, res, next) {
	try {
		let token = await authenticateUser(req.fields.email, req.fields.password);
		let refreshToken = uuid();
		cache.put(req.fields.email, refreshToken);
		res.json({ token, refreshToken });
	} catch (error) {
		console.error(error);
		switch (error) {
			case "User not found":
				res.status(401).end();
				break;
			case "Email or password incorrect":
				res.status(401).end();
				break;
			default:
				res.status(500).end();
		}
	}
}

async function authenticateUser(email, password) {
	try {
		let user = await User.findOne({
			where: {
				email: email
			}
		});
		if (!user) {
			return Promise.reject("User not found");
		}
		if (!bcrypt.compareSync(password, user.password)) {
			return Promise.reject("Email or password incorrect");
		}
		let userObject = { user: user.email };
		let token = jwt.sign(userObject, process.env.JWT_SECRET);
		return token;
	} catch (error) {
		console.error(error);
		return Promise.reject("The server made a booboo");
	}
}

module.exports = {
	getToken
};
