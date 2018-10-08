const {
	GraphQLString,
	GraphQLInt,
	GraphQLNonNull,
} = require('graphql');

const { User } = require('../../database/models');


const {
	userType,
} = require('../types');

const createUser = {
	type: userType,
	description: 'The mutation that allows you to create a new User',
	args: {
		first_name: { type: GraphQLString },
		last_name: { type: GraphQLString },
		card_content: { type: GraphQLString },
	},
	resolve: async (value, args) => {
		console.log(args);
		return User.create(args);
	},
};

const updateUser = {
	type: userType,
	description: 'The mutation that allows you to update an existing User by Id',
	args: {
		id: {
			name: 'id',
			type: new GraphQLNonNull(GraphQLInt),
		},
		first_name: {
			name: 'first_name',
			type: new GraphQLNonNull(GraphQLString),
		},
		last_name: {
			name: 'last_name',
			type: new GraphQLNonNull(GraphQLString),
		},
		card_content: {
			name: 'card_content',
			type: new GraphQLNonNull(GraphQLString),
		},
	},
	resolve: async (user, {
		id,
	}) => {
		console.log(user);
		const foundUser = await User.findById(id);

		if (!foundUser) {
			throw new Error(`User with id: ${id} not found!`);
		}

		return foundUser.update(updatedUser);
	},
};

const deleteUser = {
	type: userType,
	description: 'The mutation that allows you to delete a existing User by Id',
	args: {
		id: {
			name: 'id',
			type: new GraphQLNonNull(GraphQLInt),
		},
	},
	resolve: async (user, {
		id,
	}) => {
		const foundUser = await User.findById(id);

		if (!foundUser) {
			throw new Error(`User with id: ${id} not found!`);
		}

		await User.destroy({
			where: {
				id,
			},
		});

		return foundUser;
	},
};

module.exports = {
	createUser,
	updateUser,
	deleteUser,
};
