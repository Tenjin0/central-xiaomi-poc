const { User } = require('../database/models');

const args = {
	first_name: 'azeer',
	last_name: 'fgdfgfsd',
	card_data: 'fgdfgfsd',
	created_at: new Date(),
};
User.all().then((users) => {
	console.log(users);
});
