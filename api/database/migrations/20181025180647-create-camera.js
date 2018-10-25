module.exports = {
	up: async (queryInterface, Sequelize) => {

		await queryInterface.createTable('Cameras', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			path: {
				type: Sequelize.STRING,
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.NOW,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {

		await queryInterface.dropTable('Cameras');
	},
};
