import { Reducer } from "redux"
import { DEFAULT_FILTER, DEFAULT_PAGE, DEFAULT_PER_PAGE } from "../../config"
import { CamerasActions, CamerasActionTypes, IRequestCamerasSucceededAction } from "../constants/action-types"
import { ICamera, IListWithPagination } from "../constants/interface"

const initialState: IListWithPagination<ICamera> = {
	isFailure: false,
	isLoading: false,
	// tslint:disable-next-line:object-literal-sort-keys
	data: [],
	pagination: {
		currentPage: DEFAULT_PAGE,
		previousPage: null,
		// tslint:disable-next-line:object-literal-sort-keys
		nextPage: null,
		perPage: DEFAULT_PER_PAGE,
		totalPages: null,
		totalDatas: null,
		
	},
}

const camerasReducer: Reducer<IListWithPagination<ICamera>> = (state: IListWithPagination<ICamera> = initialState, action: CamerasActions) => {
	switch (action.type) {
		case CamerasActionTypes.CAMERAS_REQUESTED:
		return {
			...state,
			isFailure: false,
			isLoading: true,
		}		
		case CamerasActionTypes.CAMERAS_REQUEST_FAILED:
		return {
			...state,
			isFailure: true,
			isLoading: false,
		}
		case CamerasActionTypes.CAMERAS_REQUEST_SUCCEEDED:
			return {
				isFailure: false,
				isLoading: false,
				// tslint:disable-next-line:object-literal-sort-keys
				data: action.payload.more ? state.data.concat(action.payload.data): action.payload.data,
				pagination: {
					...action.payload.pagination,
					currentPage: action.payload.pagination.currentPage || DEFAULT_PAGE,
					perPage: action.payload.pagination.perPage || DEFAULT_PER_PAGE
				},
			}
		default:
			return state
	}
}

export default camerasReducer
