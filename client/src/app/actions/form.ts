import { Action, ActionCreator } from "redux"
import { ThunkAction, ThunkDispatch } from "redux-thunk"

import { FormActions, FormActionTypes } from "../constants/action-types"
import { IUser } from "../constants/interface";
import { api } from "../service/api"

const formLoadingAction: ActionCreator<FormActions> = () => ({

	type: FormActionTypes.FORM_DATALOAD_REQUESTED
})

const formSuceedAction: ActionCreator<FormActions> = () => ({

	type: FormActionTypes.FORM_DATALOAD_SUCEEDED
})

const formFailedAction: ActionCreator<FormActions> = () => ({

	type: FormActionTypes.FORM_DATALOAD_FAILED
})

const formSubmitAction: ActionCreator<FormActions> = () => ({

	type: FormActionTypes.FORM_DATA_SUBMITING
})


const formIsValidAction: ActionCreator<FormActions> = (isValid: boolean) => ({

	type: FormActionTypes.FORM_DATA_IS_VALID,
	// tslint:disable-next-line:object-literal-sort-keys
	payload: {
		isValid
	}
})

export const formLoading = () => {

	return  (dispatch: ThunkDispatch<any, void, Action>) => {

		dispatch(formLoadingAction())
	}
}

export const formFailed = () => {

	return async (dispatch: ThunkDispatch<any, void, Action>) => {

		dispatch(formFailedAction())
	}
}

export const formSuceeded = () => {

	return async (dispatch: ThunkDispatch<any, void, Action>) => {

		dispatch(formSuceedAction())
	}
}

export const formSubmitting = () => {

	return async (dispatch: ThunkDispatch<any, void, Action>) => {

		dispatch(formSubmitAction())
	}
}

export const formIsValid = (isValid: boolean) => {

	return  (dispatch: ThunkDispatch<any, void, Action>) => {

		dispatch(formIsValidAction(isValid))
	}
}


