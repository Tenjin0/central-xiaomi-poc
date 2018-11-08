const seedCameraData = require('../../scripts/seed.camera');

module.exports = {
	up: async (queryInterface, Sequelize) => {

		const data = await seedCameraData();
		queryInterface.bulkCreate(data);
	},

	down: (queryInterface, Sequelize) => {
		/*
		  Add reverting commands here.
		  Return a promise to correctly handle asynchronicity.

		  Example:

		  return queryInterface.bulkDelete('People', null, {});
		*/
		return queryInterface.dropTable('Camera');
	},
};
