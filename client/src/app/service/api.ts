import ApolloClient from "apollo-boost";
import gql from 'graphql-tag';
import { IUser } from "../constants/interface";

const _users: IUser[] = [
	{
		id: 1,
		first_name: "toto",
		last_name: "Dupont",
		card_content: "azerty"
	},
	{
		id: 2,

		first_name: "titi",
		last_name: "Dupont",
		card_content: "qsdfgh"
	},
	{
		id: 3,
		first_name: "tutu",
		last_name: "Dupont",
		card_content: "wxcvbn"
	}

]


class ServiceApi {

	private client: any

	constructor() {
		console.log("create a new instance")
		const URI = "http://localhost:3001/graphql";

		this.client = new ApolloClient({
			uri: URI
		})
	}

	getFakeUsers = () => {

		return new Promise<IUser[]>((resolve, reject) => {

			setTimeout(() => {
				console.log(_users)
				resolve(_users)
			}, 1000)
		})

	}

	getUsers = () => {

		const query = gql`
		{
			users {
			  id
			  first_name
			  last_name
			  card_content
			}
		  }
		`
		  return this.client.query({ query }).then((response: any) => {
			  console.log(response.data.users)
			  return response.data.users
		  })

	}

}
const api = new ServiceApi()

export default api
