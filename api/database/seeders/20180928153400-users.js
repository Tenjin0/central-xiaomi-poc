module.exports = {
	up: queryInterface => queryInterface.bulkInsert('Users', [{
		first_name: 'Patrice',
		last_name: 'PETIT',
		card_data: '275ccc0b',
		created_at: new Date(),
	}], {}),

	down: queryInterface => queryInterface.bulkDelete('Users', null, {}),
};
