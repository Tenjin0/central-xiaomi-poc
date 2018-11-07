import { Action } from "redux";
import { IListWithPagination, IPagination, IUser } from "./interface";

export enum UsersActionTypes {
	USERS_REQUESTED = "USERS_REQUESTED",
	USERS_REQUEST_FAILED = "USERS_REQUEST_FAILED",
	USERS_REQUEST_SUCCEEDED = "USERS_REQUEST_SUCCEEDED",
}

export enum FormActionTypes {
	FORM_DATALOAD_REQUESTED = "FORM_DATALOAD_REQUESTED",
	FORM_DATALOAD_FAILED = "FORM_DATALOAD_FAILED",
	FORM_DATALOAD_SUCCEEDED = "FORM_DATALOAD_SUCCEEDED",
	FORM_DATA_SUBMITING = "FORM_DATA_SUBMITING",
	FORM_DATA_IS_VALID = "FORM_DATA_IS_VALID",
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

export interface IFormDataLoadingAction extends Action {

	type: FormActionTypes.FORM_DATALOAD_REQUESTED
}

export interface IFormDataLoadFailedAction extends Action {

	type: FormActionTypes.FORM_DATALOAD_FAILED
}

export interface IFormDataLoadSucCeededAction extends Action {

	type: FormActionTypes.FORM_DATALOAD_SUCCEEDED;
}
export interface IFormDataSubmitingAction extends Action {

	type: FormActionTypes.FORM_DATA_SUBMITING;
}
export interface IFormDataSubmitingAction extends Action {

	type: FormActionTypes.FORM_DATA_SUBMITING;
}

export interface IFormDataIsValidAction extends Action {

	type: FormActionTypes.FORM_DATA_IS_VALID;
	payload: {
		isValid: boolean
	}
}


export type UsersActions = IRequestUsersAction | IRequestUsersFailedAction | IRequestUsersSucceededAction
export type FormActions = IFormDataLoadingAction | IFormDataLoadFailedAction | IFormDataLoadSucCeededAction |
	IFormDataSubmitingAction | IFormDataIsValidAction


