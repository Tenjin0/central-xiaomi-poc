import { Reducer } from "redux"
import { DEFAULT_FILTER, DEFAULT_PAGE, DEFAULT_PER_PAGE } from "../../config"
import { CameraArchivesActions, CameraArchivesActionTypes } from "../actionTypes/cameraArchives"
import { ICameraArchive, IListWithPagination } from "../constants/interface"

const initialState: IListWithPagination<ICameraArchive> = {
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

const camerasReducer: Reducer<IListWithPagination<ICameraArchive>> = (state: IListWithPagination<ICameraArchive> = initialState, action: CameraArchivesActions) => {
	switch (action.type) {
		case CameraArchivesActionTypes.CAMERA_ARCHIVES_REQUESTED:
		return {
			...state,
			isFailure: false,
			isLoading: true,
		}		
		case CameraArchivesActionTypes.CAMERA_ARCHIVES_REQUEST_FAILED:
		return {
			...state,
			isFailure: true,
			isLoading: false,
		}
		case CameraArchivesActionTypes.CAMERA_ARCHIVES_REQUEST_SUCCEEDED:
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
