import { Reducer } from "redux"
import { UsersActions, UsersActionTypes } from "../constants/action-types"
import { IUsersState } from "../constants/interface"

const initialState: IUsersState = {
	isFailure: false,
	isLoading: false,
	users: null
}

const usersReducer: Reducer<IUsersState> = (state: IUsersState = initialState, action) => {

	switch ((action as UsersActions).type) {
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
				...state,
				isFailure: false,
				isLoading: false,
				users: action.data
			}
		default:
			return state
	}
}

export default usersReducer
