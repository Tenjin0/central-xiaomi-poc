import { withStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import { withFormik } from 'formik';
import { connect } from 'react-redux';
import { compose } from 'redux'
import * as Yup from 'yup';
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



const handleSubmit = (values: any, actions: any) => {
	console.log(values)

	// actions.setSubmitting(false);
}

const mapPropsToValues = (props: any) => {
	console.log("mapPropsToValues", props)
	return {
		first_name: '',
		last_name: '',
		// tslint:disable-next-line:object-literal-sort-keys
		card_data: ''
	}
}

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

export default compose(
	connect(mapStateToProps),
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
