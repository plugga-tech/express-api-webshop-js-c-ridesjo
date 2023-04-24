const userService = require('../services/userService');
const authCheck = require('../services/authCheck');
const userModel = require('../models/userModel');

async function getAll(req, res, next) {
	try {
		let users = await userService.getAll();
		userModel(users);
		res.json(users);
	} catch (err) {
		console.error(`Error while getting users`, err.message);
		next(err);
	}
}

async function getOne(req, res, next) {
	try {
		let user = await userService.getOne(req.body.id);
		if (user != null) {
			userModel(user);
			res.json(user);
		} else {
			res.status(404);
			res.json({ message: "user not found" });
		}
	} catch (err) {
		console.error(`Error while getting user`, err.message);
		next(err);
	}
}




/* Lägg till ny användare */
/* exports.signup = (req, res, next) => {
	User.find({ email: req.body.email })
		.exec()
		.then((user) => {
			if (user.length >= 1) {
				return res.status(409).json({
					message: 'User with the Email Already Exist.'
				});
			} else {
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					if (err) {
						return res.status(500).json({ error: err });
					} else {
						const newUser = new User({
							_id: new mongoose.Types.ObjectId(),
							name: req.body.name,
							email: req.body.email,
							password: hash
						});
						newUser
							.save()
							.then((result) => {
								console.log(result);
								res.status(201).json(result);
							})
							.catch((err) => {
								res.status(500).json({ error: err });
							});
					}
				});
			}
		});
}; */

/* Logga in användare */
async function login (req, res, next) {
	try {
		let user = await userService.getUserByEmail(req.body.email);

		if (user != null) {
			const decryptedPassword = CryptoJS.AES.decrypt(user.password, salt).toString(CryptoJS.enc.Utf8);
			if (decryptedPassword == req.body.password) {
				res.json({message: 'success', id: user._id});
				return;
			}
		}
		res.status(401);
		res.json({message: 'Email or password was incorrect'});		
	} catch (err) {
		console.error(`Error while updating user`, err.message);
		next(err);
	}
}




/* Ta bort en användare */
async function remove (req, res, next) {
	try {
		await userService.remove(req.params.id);
		res.json({message: 'success'});
	} catch (err) {
		console.error(`Error while deleting user`, err.message);
		next(err);
	}
};
 
