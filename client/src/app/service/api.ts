import { IUser } from "../constants/interface";

const _users: IUser[] = [
	{
		first_name: "toto",
		last_name: "Dupont",
		card_content: "azerty"
	},
	{
		first_name: "titi",
		last_name: "Dupont",
		card_content: "qsdfgh"
	},
	{
		first_name: "tutu",
		last_name: "Dupont",
		card_content: "wxcvbn"
	}

]


const geFakeUsers = () => {

	return new Promise<IUser[]>((resolve, reject) => {

		setTimeout(() => {
			console.log(_users)
			resolve(_users)
		}, 1000)
	})
}

export default {
	geFakeUsers
}
