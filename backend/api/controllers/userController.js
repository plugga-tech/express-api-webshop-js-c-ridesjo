const userService = require('../services/userService');
const { changeToUserResponse, changeToUsersResponse } = require("../models/userModel");

/* Hämta alla användare */
async function getAll(req, res, next) {
	try {
		let users = await userService.getAll(req);
		changeToUsersResponse(users);
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
			changeToUserResponse(user);
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
		let user = await userService.getUserByEmail(req);
		console.log(user);
		if (user && user.password == req.body.password) {
			res.json({message: 'Success', id: user._id});				
			
		} else {
			res.status(401).json({message: 'Email or password is incorrect'});
		}		
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