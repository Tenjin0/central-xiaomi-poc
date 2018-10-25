'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		/*
		  Add altering commands here.
		  Return a promise to correctly handle asynchronicity.

		  Example:
		  return queryInterface.bulkInsert('Person', [{
		    name: 'John Doe',
		    isBetaMember: false
		  }], {});
		*/
		return queryInterface.bulkInsert('Users', [{
			first_name: 'Patrice',
			last_name: 'PETIT',
			card_data: '275ccc0b',
			created_at: new Date(),
		}], {});
	},

	down: (queryInterface, Sequelize) => {
		/*
		  Add reverting commands here.
		  Return a promise to correctly handle asynchronicity.

		  Example:
		  return queryInterface.bulkDelete('Person', null, {});
		*/
		return queryInterface.bulkDelete('Users', null, {});
	}
};
