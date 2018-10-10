export interface IUsersState {
	isLoading: boolean,
	isFailure: boolean,
	users: IUsers
} 

interface IUsers {
	first_name: string,
	last_name: string,
	card_content: string
}
