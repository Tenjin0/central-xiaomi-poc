import { Action, ActionCreator } from "redux"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { CameraArchivesActionTypes, IRequestCameraArchivesAction, IRequestCameraArchivesSucceededAction } from "../actionTypes/cameraArchives"
import { ICameraArchive, IDateRange, IGraphQLDataList } from "../constants/interface";
import { api } from "../service/api"

const CamerasRequestedAction: ActionCreator<IRequestCameraArchivesAction> = () => ({

	type: CameraArchivesActionTypes.CAMERA_ARCHIVES_REQUESTED
})

const camerasRequestSuceededAction: ActionCreator<IRequestCameraArchivesSucceededAction> = (response: IGraphQLDataList<ICameraArchive>, more: boolean) => ({

	type: CameraArchivesActionTypes.CAMERA_ARCHIVES_REQUEST_SUCCEEDED,
	// tslint:disable-next-line:object-literal-sort-keys
	payload: {
		data: response.data,
		more,
		pagination: response.pagination,
	}
})

export const getCameraArchives = (filter: IDateRange, perPage: number, page: number, more: boolean) => {

	return async (dispatch: ThunkDispatch<any, void, Action>) => {
		if (!filter) {
			filter = {}
		}
		dispatch(CamerasRequestedAction())
		const data = await api.getCameraArchives(filter, perPage, page)
		dispatch(camerasRequestSuceededAction(data, more))
	}
}
