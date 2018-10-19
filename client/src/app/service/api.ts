import ApolloClient from "apollo-boost";
import gql from 'graphql-tag';
import * as io from 'socket.io-client';
import { IUser, IUserData } from "../constants/interface";


const _users: IUser[] = [
	{
		id: 1,
		// tslint:disable-next-line:object-literal-sort-keys
		first_name: "toto",
		last_name: "Dupont",
		card_data: "azerty"
	},
	{
		id: 2,

		first_name: "titi",
		last_name: "Dupont",
		// tslint:disable-next-line:object-literal-sort-keys
		card_data: "qsdfgh"
	},
	{
		id: 3,
		// tslint:disable-next-line:object-literal-sort-keys
		first_name: "tutu",
		last_name: "Dupont",
		card_data: "wxcvbn"
	}

]


export default class ServiceApi {

	private client: any

	constructor() {
		const URI = "http://localhost:3001/graphql";

		this.client = new ApolloClient({
			uri: URI
		})
	}

	public getFakeUsers = () => {

		return new Promise<IUser[]>((resolve, ) => {

			setTimeout(() => {
				resolve(_users)
			}, 1000)
		})

	}

	public getUsers = () => {

		const query = gql`
		{
			users {
			  id
			  first_name
			  last_name
			}
		  }
		`
		return this.client.query({ query }).then((response: any) => {
			return response.data.users
		})

	}

	public addUsers = (user: IUserData) => {
		const ADD_USER = gql`
			mutation addUser($first_name: String!, $last_name: String!, $card_data: String!) {
				addTodo(tfirst_name: String!, $last_name: String!, $card_data: String!) {
				id
				}
			}
		`;
		return this.client
		.mutate({
		  mutation: ADD_USER,
		  variables: {
			first_name: user.first_name,
			last_name: user.last_name,
			// tslint:disable-next-line:object-literal-sort-keys
			card_data: user.card_data,
		  },
		})
		.then((response: any) => {

			return Promise.resolve(response.data)
		})
	}

}
export const api = new ServiceApi()
export const socket = io('http://localhost:3001/client', {
	reconnection: false
});

