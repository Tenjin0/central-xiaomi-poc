export interface IUsersState {
	isLoading: boolean
	isFailure: boolean
	data: IUser[]
} 

export interface IUser {
	id: number
	first_name: string
	last_name: string
	card_content: string
}
