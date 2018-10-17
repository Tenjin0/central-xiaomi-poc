import { withStyles, WithStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import TextField from '@material-ui/core/TextField';
import { Formik, InjectedFormikProps, withFormik } from 'formik';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux'
import * as Yup from 'yup';
import { IFormState } from '../constants/interface'
import { withApi } from '../service/apiContext'

interface IFormValues {
	first_name: string;
	last_name: string;
	card_data: string;
}

interface IFormProps {
	first_name?: string;
	last_name?: string;
	card_data?: string;
}

const styles = (theme: Theme) =>
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

const validationSchema = Yup.object().shape({
	first_name: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
	last_name: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
	// tslint:disable-next-line:object-literal-sort-keys
	card_data: Yup.string()
		.required('Required'),
});

const handleSubmit = (values: any, actions: any) => {
	console.log(values)

	// actions.setSubmitting(false);
}

const mapPropsToValues = (props: any) => {
	console.log(props)
	return {
		first_name: '',
		last_name: '',
		// tslint:disable-next-line:object-literal-sort-keys
		card_data: ''
	}
}




class UserForm extends React.Component<InjectedFormikProps<IFormProps, IFormValues> & WithStyles<typeof styles> & IFormState, any> {

	public render() {
		const { classes } = this.props;
		const {
			values,
			errors,
			handleChange,
			// tslint:disable-next-line:no-shadowed-variable
			handleSubmit,
			isSubmitting
		} = this.props;
		console.log(errors)
		return (
			<div className={classes.container}>
				<form className={classes.form} onSubmit={handleSubmit}>
					<TextField
						id="first_name"
						name="first_name"
						label="first name"
						className={classes.textField}
						value={values.first_name}
						onChange={handleChange}
						margin="normal"
					/>
					<TextField
						id="last_name"
						name="last_name"
						label="last name"
						className={classes.textField}
						value={values.last_name}
						onChange={handleChange}
						margin="normal"
					/>
					<input
						id="card_data"
						name="card_data"
						type="hidden"
						onChange={handleChange}
						value={values.card_data}
					/>
					<div className={classes.buttons}>
						<Button type="submit" variant="text" color="primary" className={classes.button}>
							Submit
					</Button>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		...state.form
	}
}

export default compose(
	connect(mapStateToProps),
	withStyles(styles),
	withFormik({
		enableReinitialize: true,
		handleSubmit,
		mapPropsToValues,
		validateOnChange: true,
		validationSchema,
	}),
	withApi
)(UserForm);
