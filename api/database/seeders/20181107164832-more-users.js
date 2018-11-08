function generateUsers(number) {

	const users = [];
	for (let i = 0; i < number; i++) {

	}
}

function generateUser(number) {

}
module.exports = {

	up: queryInterface => queryInterface.bulkInsert('Users', [{
		first_name: 'prenom1',
		last_name: 'nom1',
		card_data: 'aaaaaaaa',
		created_at: new Date(),
	},
	{
		first_name: 'prenom2',
		last_name: 'nom2',
		card_data: 'aaaaaaab',
		created_at: new Date(),
	},

	], {}),


	down: (queryInterface, Sequelize) => {
		/*
		  Add reverting commands here.
		  Return a promise to correctly handle asynchronicity.

		  Example:
		  return queryInterface.bulkDelete('People', null, {});
		*/
	},
};
