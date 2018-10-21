import { Reducer } from "redux"
import { FormActions, FormActionTypes } from "../constants/action-types"
import { IFormState } from "../constants/interface"

const initialState: IFormState = {
	isFailure: false,
	isLoading: false,
	isSubmiting: false,
	isValid: false

}

const formReducer: Reducer<IFormState> = (state: IFormState = initialState, action: FormActions) => {

	switch (action.type) {
		case FormActionTypes.FORM_DATALOAD_REQUESTED:
		return {
			...state,
			isFailure: false,
			isLoading: true,
			isSubmiting: false
		}		
		case FormActionTypes.FORM_DATALOAD_FAILED:
		return {
			...state,
			isFailure: true,
			isLoading: false,
			isSubmiting: false

		}
		case FormActionTypes.FORM_DATALOAD_SUCEEDED:
			return {
				...state,
				isFailure: false,
				isLoading: false,
				isSubmiting: false,
				isValid: false

			}
		case FormActionTypes.FORM_DATA_SUBMITING:
			return {
				...state,
				isFailure: false,
				isLoading: false,
				isSubmiting: true

			}
		case FormActionTypes.FORM_DATA_IS_VALID:
			return {
				...state,
				isValid: action.payload.isValid

			}
		default:
			return state
	}
}

export default formReducer
