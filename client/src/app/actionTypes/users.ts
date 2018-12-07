import { Action } from "redux";

import { IPagination, IUser } from "../constants/interface";

export enum UsersActionTypes {
	USERS_REQUESTED = "USERS_REQUESTED",
	USERS_REQUEST_FAILED = "USERS_REQUEST_FAILED",
	USERS_REQUEST_SUCCEEDED = "USERS_REQUEST_SUCCEEDED",
}

export interface IRequestUsersAction extends Action {

	type: UsersActionTypes.USERS_REQUESTED
}

export interface IRequestUsersFailedAction extends Action {

	type: UsersActionTypes.USERS_REQUEST_FAILED
}

export interface IRequestUsersSucceededAction extends Action {

	type: UsersActionTypes.USERS_REQUEST_SUCCEEDED;
	payload: {
		data: IUser[],
		pagination: IPagination
	}
}

export type UsersActions = IRequestUsersAction | IRequestUsersFailedAction | IRequestUsersSucceededAction
