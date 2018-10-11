import { Action, ActionCreator, Dispatch, AnyAction } from "redux"
import { ThunkAction, ThunkDispatch} from "redux-thunk"
import { IRequestUsersAction,IRequestUsersSuceededAction, UsersActionTypes, UsersActions } from "../constants/action-types"
import apiService from "../service/api"
import { IUser, IUsersState } from "../constants/interface";

const usesrRequestedAction: ActionCreator<IRequestUsersAction> = () => ({

	type: UsersActionTypes.USERS_REQUESTED
})

const userRequestSuceededAction: ActionCreator<IRequestUsersSuceededAction> = (data: IUser[]) => ({

	type: UsersActionTypes.USERS_REQUEST_SUCEEDED,
	payload: {
		data: data
	}
})

// export const getUsers: ActionCreator<ThunkAction<Promise<void>, any, void, AnyAction>> = (params?: any) =>  async (dispatch, getState) => {

// 	dispatch(usesrRequestedAction)
// 	const data = await apiService.getUsers()
// 	dispatch(userRequestSuceededAction(data))
// }

export const getUsers = (arg: any)  => {

	return async (dispatch: ThunkDispatch<any, void, Action>) => {
	  
		dispatch(usesrRequestedAction())
		const data = await apiService.geFakeUsers()
		dispatch(userRequestSuceededAction(data))
	}
}
