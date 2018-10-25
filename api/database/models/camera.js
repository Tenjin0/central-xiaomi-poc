module.exports = (sequelize, DataTypes) => {
	const Camera = sequelize.define('Camera', {
		path: DataTypes.STRING,
		created_at: DataTypes.DATE,
	}, {
		timestamps: false,
	});
	Camera.associate = function (models) {
		// associations can be defined here
	};
	return Camera;
};
