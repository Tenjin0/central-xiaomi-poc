import { Action } from "redux";
import { IUser } from "./interface";

export enum UsersActionTypes {
	USERS_REQUESTED = "USERS_REQUESTED",
	USERS_REQUEST_FAILED = "USERS_REQUEST_FAILED",
	USERS_REQUEST_SUCEEDED = "USERS_REQUEST_SUCEEDED",
	userRequestSuceededAction = "userRequestSuceededAction"
}

export interface IRequestUsersAction extends Action {

	type: UsersActionTypes.USERS_REQUESTED
}

export interface IRequestUsersFailedAction extends Action {

	type: UsersActionTypes.USERS_REQUEST_FAILED
}

export interface IRequestUsersSuceededAction extends Action {

	type: UsersActionTypes.USERS_REQUEST_SUCEEDED;
	payload: {
		data : IUser[]
	}
}

export type  UsersActions = IRequestUsersAction | IRequestUsersFailedAction | IRequestUsersSuceededAction


