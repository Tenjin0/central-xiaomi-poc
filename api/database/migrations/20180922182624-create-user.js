module.exports = {

	up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER,
		},
		first_name: {
			type: Sequelize.STRING,
		},
		last_name: {
			type: Sequelize.STRING,
		},
		card_data: {
			type: Sequelize.STRING,
		},
		created_at: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.NOW,
		},
	}),
	down: (queryInterface, Sequelize) => queryInterface.dropTable('Users'),
};
