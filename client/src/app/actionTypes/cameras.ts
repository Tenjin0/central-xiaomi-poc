import { Action } from "redux";
import { ICamera, IPagination, IUser } from "../constants/interface";


export enum CamerasActionTypes {
	CAMERAS_REQUESTED = "CAMERAS_REQUESTED",
	CAMERAS_REQUEST_FAILED = "CAMERAS_REQUEST_FAILED",
	CAMERAS_REQUEST_SUCCEEDED = "CAMERAS_REQUEST_SUCCEEDED"
}

export interface IRequestCamerasAction extends Action {

	type: CamerasActionTypes.CAMERAS_REQUESTED
}

export interface IRequestCamerasFailedAction extends Action {

	type: CamerasActionTypes.CAMERAS_REQUEST_FAILED
}

export interface IRequestCamerasSucceededAction extends Action {

	type: CamerasActionTypes.CAMERAS_REQUEST_SUCCEEDED;
	payload: {
		data: ICamera[],
		more: boolean,
		pagination: IPagination
	}
}


export type CamerasActions = IRequestCamerasAction | IRequestCamerasFailedAction | IRequestCamerasSucceededAction


