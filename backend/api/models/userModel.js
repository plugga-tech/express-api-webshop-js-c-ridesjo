function changeToUserResponse(user) {
	user.id = user._id;
	delete user._id;
}

function changeToUsersResponse(users) {
    for(let user of users) {
		changeToUserResponse(user);
		delete user.password;
    }
}

module.exports = {
	changeToUserResponse,
	changeToUsersResponse
};