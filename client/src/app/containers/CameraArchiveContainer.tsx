import * as React from 'react';
import { Flipped, Flipper } from 'react-flip-toolkit';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk'
import { getCameraArchive } from "../actions/cameras"
import CameraArchive from '../components/CameraArchiveComponent';
import { IAppState, ICamera, IDateRange, IListWithPagination } from '../constants/interface';


export interface ICameraArchiveProps extends IListWithPagination<ICamera> {

	requestCameraArchive: (filter:IDateRange, perPage: number, page: number) => Promise<void>
	history: any
}

const mapStateToProps = (state: IAppState) => {
	return {
		...state.camerasRequest
	}
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, void, Action>) => {
	return {
		requestCameraArchive: (filter:IDateRange, perPage: number, page: number) => dispatch(getCameraArchive(filter, perPage, page)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CameraArchive);
