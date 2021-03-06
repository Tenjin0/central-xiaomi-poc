import { Action, ActionCreator } from "redux"
import { ThunkDispatch } from "redux-thunk"

import { FormActions, FormActionTypes } from "../actionTypes/form"

const formLoadingAction: ActionCreator<FormActions> = () => ({

	type: FormActionTypes.FORM_DATALOAD_REQUESTED
})

const formLoadSuceedAction: ActionCreator<FormActions> = () => ({

	type: FormActionTypes.FORM_DATALOAD_SUCCEEDED
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

export const formLoadSuceeded = () => {

	return async (dispatch: ThunkDispatch<any, void, Action>) => {

		dispatch(formLoadSuceedAction())
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


