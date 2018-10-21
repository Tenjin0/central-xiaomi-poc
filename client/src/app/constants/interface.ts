export interface IUsersState {
	isLoading: boolean
	isFailure: boolean
	data: IUser[]
} 
export interface IUser {
	id?: number
	first_name: string
	last_name: string
	card_data: string
}

export interface IFormState {
	isLoading: boolean
	isFailure: boolean
	isSubmiting: boolean
	isValid: boolean

} 
