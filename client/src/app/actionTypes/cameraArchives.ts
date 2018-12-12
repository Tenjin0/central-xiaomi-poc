import { Action } from "redux";
import { ICameraArchive, IPagination, IUser } from "../constants/interface";


export enum CameraArchivesActionTypes {
	CAMERA_ARCHIVES_REQUESTED = "CAMERA_ARCHIVES_REQUESTED",
	CAMERA_ARCHIVES_REQUEST_FAILED = "CAMERA_ARCHIVES_REQUEST_FAILED",
	CAMERA_ARCHIVES_REQUEST_SUCCEEDED = "CAMERA_ARCHIVES_REQUEST_SUCCEEDED"
}

export interface IRequestCameraArchivesAction extends Action {

	type: CameraArchivesActionTypes.CAMERA_ARCHIVES_REQUESTED
}

export interface IRequestCameraArchivesFailedAction extends Action {

	type: CameraArchivesActionTypes.CAMERA_ARCHIVES_REQUEST_FAILED
}

export interface IRequestCameraArchivesSucceededAction extends Action {

	type: CameraArchivesActionTypes.CAMERA_ARCHIVES_REQUEST_SUCCEEDED;
	payload: {
		data: ICameraArchive[],
		more: boolean,
		pagination: IPagination
	}
}

export type CameraArchivesActions = IRequestCameraArchivesAction | IRequestCameraArchivesFailedAction | IRequestCameraArchivesSucceededAction


