import { Reducer } from "redux"
import { FormActions, FormActionTypes } from "../constants/action-types"
import { IFormState } from "../constants/interface"

const initialState: IFormState = {
	isFailure: false,
	isLoading: false,
}

const formReducer: Reducer<IFormState> = (state: IFormState = initialState, action: FormActions) => {

	switch (action.type) {
		case FormActionTypes.FORM_DATALOAD_REQUESTED:
		return {
			isFailure: false,
			isLoading: true,
		}		
		case FormActionTypes.FORM_DATALOAD_FAILED:
		return {
			isFailure: true,
			isLoading: false,
		}
		case FormActionTypes.FORM_DATALOAD_SUCEEDED:
			return {
				isFailure: false,
				isLoading: false,
			}
		default:
			return state
	}
}

export default formReducer
