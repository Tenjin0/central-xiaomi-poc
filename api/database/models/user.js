module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {

		first_name: DataTypes.STRING,
		last_name: DataTypes.STRING,
		card_data: DataTypes.STRING,
		created_at: DataTypes.DATE,

	}, {
		timestamps: false,
	});
	User.associate = function (models) {
		// associations can be defined here
	};
	return User;
};
