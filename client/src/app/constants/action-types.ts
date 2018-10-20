import { Action } from "redux";
import { IUser } from "./interface";

export enum UsersActionTypes {
	USERS_REQUESTED = "USERS_REQUESTED",
	USERS_REQUEST_FAILED = "USERS_REQUEST_FAILED",
	USERS_REQUEST_SUCEEDED = "USERS_REQUEST_SUCEEDED",
}

export enum FormActionTypes {
	FORM_DATALOAD_REQUESTED = "FORM_DATALOAD_REQUESTED",
	FORM_DATALOAD_FAILED = "FORM_DATALOAD_FAILED",
	FORM_DATALOAD_SUCEEDED = "FORM_DATALOAD_SUCEEDED",
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

export interface IFormDataLoadingAction extends Action {

	type: FormActionTypes.FORM_DATALOAD_REQUESTED
}

export interface IFormDataLoadFailedAction extends Action {

	type: FormActionTypes.FORM_DATALOAD_FAILED
}

export interface IFormDataLoadSuceededAction extends Action {

	type: FormActionTypes.FORM_DATALOAD_SUCEEDED;
}

export type  UsersActions = IRequestUsersAction | IRequestUsersFailedAction | IRequestUsersSuceededAction
export type  FormActions = IFormDataLoadingAction | IFormDataLoadFailedAction | IFormDataLoadSuceededAction


