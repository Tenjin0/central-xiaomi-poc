import { createStyles, Theme, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { Action, compose } from 'redux';
import { ThunkDispatch } from 'redux-thunk'
import { getCameraArchive } from "../actions/cameras"
import CameraArchive from '../components/CameraArchiveComponent';
import { IAppState, ICamera, IDateRange, IListWithPagination } from '../constants/interface';

export const styles = (theme: Theme) =>
	createStyles({
		container: {
			display: 'flex',
			flexWrap: 'wrap',
			// tslint:disable-next-line:object-literal-sort-keys
			flexDirection: 'column',
			alignItems: 'center'
		},
		form: {
			display: 'flex',
			flexDirection: 'column'
		},
		textField: {
			marginLeft: theme.spacing.unit,
			marginRight: theme.spacing.unit,
			width: 200,
		},
		// tslint:disable-next-line:object-literal-sort-keys
		button: {
			margin: theme.spacing.unit,
		},
		buttons: {
			display: "flex",
			// tslint:disable-next-line:object-literal-sort-keys
			justifyContent: 'space-between',
			marginTop: '1em'
		},
		// tslint:disable-next-line:object-literal-sort-keys
		dense: {
			marginTop: 19,
		},
		menu: {
			width: 200,
		},
	})
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


export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withStyles(styles),
)(CameraArchive);

