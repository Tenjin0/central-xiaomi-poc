import { Reducer } from "redux"
import { IUsersState } from "../constants/interface"
import { UsersActions } from "../constants/action-types"
const initialState: IUsersState = {
	isLoading: false,
	isFailure: false,
	users: null
}

const usersReducer: Reducer<IUsersState> = (state: IUsersState = initialState, action) => {
	switch ((action as UsersActions).type) {
		case "USERS_RECEIVED":
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
