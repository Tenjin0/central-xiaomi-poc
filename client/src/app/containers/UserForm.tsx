import { withStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import { connect } from 'react-redux';
import { Action, compose } from 'redux'
import { ThunkDispatch } from 'redux-thunk';
import { formFailed, formLoading, formSuceeded } from "../actions/form"
import UserFormComponent from '../components/UserForm'
import { withApi } from '../service/apiContext'


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
			justifyContent: 'flex-end',
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

// class UserFormContainer extends React.Component<any, any> {

// 	public render() {
		
// 		return (
// 			<ApiContextConsumer>
// 					{
// 						apiContext => <UserFormComponent {...this.props} {...apiContext} />
// 					}
// 				</ApiContextConsumer>
// 		);
// 	}
// }


const mapStateToProps = (state: any) => {
	return {
		...state.form
	}
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, void, Action>) => {
	return {
		formFailed: () => dispatch(formFailed),
		formLoading: () => dispatch(formLoading),
		formSuceeded: () => dispatch(formSuceeded),
	};
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withStyles(styles),
	withApi, // before withFormik
	// withFormik({ // must be last
	// 	enableReinitialize: true,
	// 	handleSubmit,
	// 	mapPropsToValues,
	// 	validateOnChange: true,
	// 	validationSchema,
	// }),
)(UserFormComponent);
