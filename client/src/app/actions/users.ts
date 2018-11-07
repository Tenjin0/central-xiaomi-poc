import { Action, ActionCreator } from "redux"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { IRequestUsersAction, IRequestUsersSucceededAction, UsersActionTypes } from "../constants/action-types"
import { IGraphQLDataList, IUser } from "../constants/interface";
import { api } from "../service/api"

const usersRequestedAction: ActionCreator<IRequestUsersAction> = () => ({

	type: UsersActionTypes.USERS_REQUESTED
})

const userRequestSuceededAction: ActionCreator<IRequestUsersSucceededAction> = (response: IGraphQLDataList<IUser>) => ({

	type: UsersActionTypes.USERS_REQUEST_SUCCEEDED,
	// tslint:disable-next-line:object-literal-sort-keys
	payload: {
		data: response.data,
		pagination: response.pagination,
	}
})


export const getUsers = (filter: string, perPage: number, page: number) => {

	return async (dispatch: ThunkDispatch<any, void, Action>) => {

		dispatch(usersRequestedAction())
		const data = await api.getUsers(filter, perPage, page)
		dispatch(userRequestSuceededAction(data))
	}
}
