const Users = {
	add(req, res) {
		// req.models.Users.
		res.send('User added');
	},
	list(req, res) {
		res.send('Users list');
	},
	edit(req, res) {
		res.send('Users list');
	},
	delete(req, res) {
		res.send('Users list');
	},
};

module.exports = Users;
