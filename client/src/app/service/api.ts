import ApolloClient from "apollo-boost";
import gql from 'graphql-tag';
import { IUser } from "../constants/interface";

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


class ServiceApi {

	private client: any

	constructor() {
		const URI = "http://localhost:3001/graphql";

		this.client = new ApolloClient({
			uri: URI
		})
	}

	public getFakeUsers = () => {

		return new Promise<IUser[]>((resolve, reject) => {

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

}
const api = new ServiceApi()

export default api
