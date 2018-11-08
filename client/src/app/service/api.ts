import ApolloClient, { InMemoryCache } from "apollo-boost";
import gql from 'graphql-tag';
import * as io from 'socket.io-client';
import { API_GRAPHQL_URL } from "../../config";
import { IDateRange, IUser } from "../constants/interface";


const USERS: IUser[] = [
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
		const URI = API_GRAPHQL_URL;

		this.client = new ApolloClient({
			uri: URI,
			// tslint:disable-next-line:object-literal-sort-keys
			cache: new InMemoryCache({
				addTypename: false
			})
		})
	}

	public getFakeUsers = () => {

		return new Promise<IUser[]>((resolve, ) => {

			setTimeout(() => {
				resolve(USERS)
			}, 1000)
		})

	}

	public getUser = (id: number) => {

		const GET_USER_BY_ID = gql`
			query user($id: ID!) {
				user(id: $id) {
				id
				first_name
				last_name
				card_data
				}
			}
		`;
		return this.client.query({ query: GET_USER_BY_ID, variables: { id } }).then((response: any) => {
			return response.data.user
		})

	}

	public getUsers = (filter: string, perPage: number, page: number) => {

		const GET_USERS = gql`
			query getUsers($filter: String!, $perPage: Int!, $page: Int!) {

				users(filter: $filter, per_page: $perPage, page: $page ) {
					data {
						id
						first_name
						last_name
						card_data
					}
					pagination {
						currentPage
						previousPage
						nextPage
						perPage
						totalPages
						totalDatas
					}
					
				}
			}
		`
		return this.client.query({ query: GET_USERS, variables: { filter, perPage, page }  }).then((response: any) => {
			return response.data.users
		})

	}

	public createUser = (user: IUser): Promise<IUser> => {

		const ADD_USER = gql`
			mutation createUser($first_name: String!, $last_name: String!, $card_data: String!) {
				createUser(first_name: $first_name, last_name: $last_name, card_data: $card_data) {
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
				return response.data
			})
	}

	public updateUser = (user: IUser): Promise<IUser> => {

		const UPDATE_USER = gql`
			mutation updateUser($id: ID!, $first_name: String!, $last_name: String!, $card_data: String!) {
				updateUser(id:$id, first_name: $first_name, last_name: $last_name, card_data: $card_data) {
					id
				}
			}
		`;
		return this.client
			.mutate({
				mutation: UPDATE_USER,
				variables: {
					id: user.id,
					// tslint:disable-next-line:object-literal-sort-keys
					first_name: user.first_name,
					last_name: user.last_name,
					// tslint:disable-next-line:object-literal-sort-keys
					card_data: user.card_data,
				},
			})
			.then((response: any) => {
				return response.data
			})
	}

	public getCameras = (filter: IDateRange, perPage: number, page: number) => {

		const GET_CAMERAS = gql`
			query getCameras($filter: RangeDate!, $perPage: Int!, $page: Int!) {

				cameras(filter: $filter, per_page: $perPage, page: $page ) {
					data {
						id
						path
						created_at
					}
					pagination {
						currentPage
						previousPage
						nextPage
						perPage
						totalPages
						totalDatas
					}
					
				}
			}
		`
		return this.client.query({ query: GET_CAMERAS, variables: { filter, perPage, page }  }).then((response: any) => {
			return response.data.cameras
		})
	}

}

export const api = new ServiceApi()

export const socket = io('http://localhost:3001/client', {
	reconnection: false
});

