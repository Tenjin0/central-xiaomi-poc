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

