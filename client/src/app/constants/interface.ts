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

export interface ICamera {
	id?: number
	path: string
	created_at: string
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
	camerasRequest: IListWithPagination<ICamera>,
	// tslint:disable-next-line:object-literal-sort-keys
	routerReducer: any
}


export interface IDateRange {
	min_date?: string,
	max_date?: string
}
