import { createStyles, Theme, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { Action, compose } from 'redux';
import { ThunkDispatch } from 'redux-thunk'
import { getCameraArchive } from "../actions/cameras"
import CameraArchive from '../components/CameraArchiveComponent';
import { IAppState, ICamera, IDateRange, IListWithPagination } from '../constants/interface';


export interface ICameraArchiveProps extends IListWithPagination<ICamera> {

	requestCameraArchive: (filter: IDateRange, perPage: number, page: number) => Promise<void>
	history: any
}

const mapStateToProps = (state: IAppState) => {
	return {
		...state.camerasRequest
	}
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, void, Action>) => {
	return {
		requestCameraArchive: (filter: IDateRange, perPage: number, page: number) => dispatch(getCameraArchive(filter, perPage, page)),
	};
}


export default compose(
	connect(mapStateToProps, mapDispatchToProps),
)(CameraArchive);

