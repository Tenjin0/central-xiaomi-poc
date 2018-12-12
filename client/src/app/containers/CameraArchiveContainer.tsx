import { connect } from 'react-redux';
import { Action, compose } from 'redux';
import { ThunkDispatch } from 'redux-thunk'
import { getCameraArchives } from "../actions/cameraArchives"
import CameraArchives from '../components/CameraArchivesComponent';
import { IAppState, ICameraArchive, IDateRange, IListWithPagination } from '../constants/interface';


export interface ICameraArchiveProps extends IListWithPagination<ICameraArchive> {

	requestCameraArchive: (filter: IDateRange, perPage: number, page: number, more: boolean) => Promise<void>
	history: any
}

const mapStateToProps = (state: IAppState) => {
	return {
		...state.camerasArchives
	}
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, void, Action>) => {
	return {
		requestCameraArchive: (filter: IDateRange, perPage: number, page: number, more: boolean) => dispatch(getCameraArchives(filter, perPage, page, more)),
	};
}


export default compose(
	connect(mapStateToProps, mapDispatchToProps),
)(CameraArchives);

