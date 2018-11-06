export interface IListWithPagination<T> {
	isLoading: boolean
	isFailure: boolean
	data: T[]
	pagination?: IPagination
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

export interface IPagination {
	currentPage?: number
	previousPage?: number
	nextPage?: number
	perPage?: number
	totalPages?: number
	totalDatas?: number
}

export interface IGraphQLDataList<T> {
	data: T[]
	pagination?: IPagination
}

export interface IAppState {
	form: IFormState,
	usersRequest: IListWithPagination<IUser>,
	// tslint:disable-next-line:object-literal-sort-keys
	routerReducer: any
}
