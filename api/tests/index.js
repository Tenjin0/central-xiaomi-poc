const { User } = require('../database/models');

User.all().then((users) => {
	console.log(users);
});
