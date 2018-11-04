module.exports = (sequelize, DataTypes) => {

	const User = sequelize.define('User', {

		first_name: DataTypes.STRING,
		last_name: DataTypes.STRING,
		card_data: DataTypes.STRING,
		created_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},

	}, {
		timestamps: false,
	});

	return User;

};
