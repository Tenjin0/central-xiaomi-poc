import { WithStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { InjectedFormikProps } from 'formik';
import * as React from 'react';
import { IFormState } from '../constants/interface'
import { styles } from '../containers/UserForm'

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



export default class UserForm extends React.Component<InjectedFormikProps<IFormProps, IFormValues> & WithStyles<typeof styles> & IFormState, any> {

	public render() {
		const { classes } = this.props;
		const {
			values,
			errors,
			handleChange,
			// tslint:disable-next-line:no-shadowed-variable
			handleSubmit		} = this.props;
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

