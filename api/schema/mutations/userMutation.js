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
		card_data: { type: GraphQLString },
	},
	resolve: async (value, args) => User.create(args),
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
		card_data: {
			name: 'card_data',
			type: new GraphQLNonNull(GraphQLString),
		},
	},
	resolve: async (value, { id }) => {
		const foundUser = await User.findById(id);

		if (!foundUser) {
			throw new Error(`User with id: ${id} not found!`);
		}
		return foundUser.update(id);
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
	resolve: async (value, { id }) => {
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
