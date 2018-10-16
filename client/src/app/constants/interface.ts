export interface IUsersState {
	isLoading: boolean
	isFailure: boolean
	data: IUser[]
} 
export interface IUserData {
	first_name: string
	last_name: string
	card_data: string
}
export interface IUser extends IUserData{
	id: number
}

