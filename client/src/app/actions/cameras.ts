import { Action, ActionCreator } from "redux"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { CamerasActionTypes, IRequestCamerasAction, IRequestCamerasSucceededAction } from "../constants/action-types"
import { ICamera, IDateRange, IGraphQLDataList } from "../constants/interface";
import { api } from "../service/api"

const CamerasRequestedAction: ActionCreator<IRequestCamerasAction> = () => ({

	type: CamerasActionTypes.CAMERAS_REQUESTED
})

const camerasRequestSuceededAction: ActionCreator<IRequestCamerasSucceededAction> = (response: IGraphQLDataList<ICamera>, more: boolean) => ({

	type: CamerasActionTypes.CAMERAS_REQUEST_SUCCEEDED,
	// tslint:disable-next-line:object-literal-sort-keys
	payload: {
		data: response.data,
		more,
		pagination: response.pagination,
	}
})

export const getCameraArchive = (filter: IDateRange, perPage: number, page: number, more: boolean) => {

	return async (dispatch: ThunkDispatch<any, void, Action>) => {
		if (!filter) {
			filter = {}
		}
		dispatch(CamerasRequestedAction())
		const data = await api.getCameras(filter, perPage, page)
		dispatch(camerasRequestSuceededAction(data, more))
	}
}
