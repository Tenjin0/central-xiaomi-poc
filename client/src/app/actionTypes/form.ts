import { Action } from "redux";


export enum FormActionTypes {
	FORM_DATALOAD_REQUESTED = "FORM_DATALOAD_REQUESTED",
	FORM_DATALOAD_FAILED = "FORM_DATALOAD_FAILED",
	FORM_DATALOAD_SUCCEEDED = "FORM_DATALOAD_SUCCEEDED",
	FORM_DATA_SUBMITING = "FORM_DATA_SUBMITING",
	FORM_DATA_IS_VALID = "FORM_DATA_IS_VALID",
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


export type FormActions = IFormDataLoadingAction | IFormDataLoadFailedAction | IFormDataLoadSucCeededAction |
	IFormDataSubmitingAction | IFormDataIsValidAction


