import { Reducer } from "redux"
import { UsersActions, UsersActionTypes } from "../constants/action-types"
import { IUsersState } from "../constants/interface"

const initialState: IUsersState = {
	isFailure: false,
	isLoading: false,
	// tslint:disable-next-line:object-literal-sort-keys
	data: []
}

const usersReducer: Reducer<IUsersState> = (state: IUsersState = initialState, action: UsersActions) => {

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
				data: action.payload.data
			}
		default:
			return state
	}
}

export default usersReducer
