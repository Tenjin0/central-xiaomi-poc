import { Action, ActionCreator } from "redux"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { IRequestUsersAction, IRequestUsersSuceededAction, UsersActionTypes } from "../constants/action-types"
import { IGraphQLDataList, IUser } from "../constants/interface";
import { api } from "../service/api"

const usesrRequestedAction: ActionCreator<IRequestUsersAction> = () => ({

	type: UsersActionTypes.USERS_REQUESTED
})

const userRequestSuceededAction: ActionCreator<IRequestUsersSuceededAction> = (response: IGraphQLDataList<IUser>) => ({

	type: UsersActionTypes.USERS_REQUEST_SUCEEDED,
	// tslint:disable-next-line:object-literal-sort-keys
	payload: {
		data: response.data,
		pagination: response.pagination,
	}
})


export const getUsers = (filter: string, perPage: number, page: number) => {

	return async (dispatch: ThunkDispatch<any, void, Action>) => {

		dispatch(usesrRequestedAction())
		const data = await api.getUsers(filter, perPage, page)
		dispatch(userRequestSuceededAction(data))
	}
}
