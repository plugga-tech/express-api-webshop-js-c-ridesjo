const userService = require('../services/userService');
const authService = require('../services/authService');
const CryptoJS = require("crypto-js");
const salt = process.env.SALT;
const { v4: uuidv4 } = require('uuid');
const { convertToUserResponse, convertToUsersResponse } = require("../mappers/userMapper");

/* Hämta alla användare */
async function getAll(req, res, next) {
	try {
		let users = await userService.getAll(req);
		convertToUsersResponse(users);
		res.json(users);
	} catch (err) {
		console.error(`Error while getting users`, err.message);
		next(err);
	}
}

/* Hämta en användare */
async function getOne(req, res, next) {
	try {
		let user = await userService.getOne(req);
		if (user != null) {
			convertToUserResponse(user);
			res.json(user);
		} else {
			res.status(404);
			res.json({ message: "User not found" });
		}
	} catch (err) {
		console.error(`Error while getting user`, err.message);
		next(err);
	}
}

/* Skapa en ny användare */
async function create(req, res, next) {
	try {
	/* 	if (req.body.name == '' || req.body.email == '' || req.body.password == ''
		|| req.body.name == null || req.body.email == null || req.body.password == null) {
			res.status(400);
			res.json({ message: "All fields must be filled." });
			return;
		} */
	
		let newUser = {
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		};
		
		let result = await userService.create(req, newUser);

		if (result != null) {
			res.status(201);
			res.json({ message: "Success", id: result.insertedId });
		} else {
			res.status(400);
			res.json({ message: "User with that email already exists" });
		}
	} catch (err) {
		console.error(`Error while creating user`, err.message);
		next(err);
	}
}

/* Logga in användare */
async function login (req, res, next) {
	try {
		let user = await userService.getUserByEmail(req.body.email);

		if (user != null) {
			const decryptedPassword = CryptoJS.AES.decrypt(user.password, salt).toString(CryptoJS.enc.Utf8);
			if (decryptedPassword == req.body.password) {
				//const token = uuidv4();
				//authorisationService.addToken(token);
				res.json({message: 'Success', id: user._id});
				return;
			}
		}
		res.status(401);
		res.json({message: 'Email or password is incorrect'});		
	} catch (err) {
		console.error(`Error while updating user`, err.message);
		next(err);
	}
}

module.exports = {
	getAll,
	getOne,
	create,
	login
};