import { Reducer } from "redux"
import { DEFAULT_PER_PAGE } from "../../config"
import { UsersActions, UsersActionTypes } from "../constants/action-types"
import { IListWithPagination, IUser } from "../constants/interface"
const initialState: IListWithPagination<IUser> = {
	isFailure: false,
	isLoading: false,
	// tslint:disable-next-line:object-literal-sort-keys
	data: [],
	pagination: {
		previousPage: null,
		// tslint:disable-next-line:object-literal-sort-keys
		nextPage: null,
		perPage: DEFAULT_PER_PAGE,
		totalPages: null,
		totalDatas: null,

	}
}

const usersReducer: Reducer<IListWithPagination<IUser>> = (state: IListWithPagination<IUser> = initialState, action: UsersActions) => {

	switch (action.type) {
		case UsersActionTypes.USERS_REQUESTED:
		return {
			...state,
			isFailure: false,
			isLoading: true,
		}		
		case UsersActionTypes.USERS_REQUEST_FAILED:
		return {
			...state,
			isFailure: true,
			isLoading: false,
		}
		case UsersActionTypes.USERS_REQUEST_SUCEEDED:
			return {
				isFailure: false,
				isLoading: false,
				// tslint:disable-next-line:object-literal-sort-keys
				data: action.payload.data,
				pagination: action.payload.pagination,
			}
		default:
			return state
	}
}

export default usersReducer
