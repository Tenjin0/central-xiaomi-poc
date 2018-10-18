import { WithStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { InjectedFormikProps } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';
import { IFormState } from '../constants/interface'
import { styles } from '../containers/UserForm'
import { IApiContext } from '../service/apiContext';

interface IFormValues {
	first_name: string;
	last_name: string;
	card_data: string;
}

interface IFormProps {
	first_name?: string;
	last_name?: string;
}

interface IUserFormState {
	first_name?: string;
	last_name?: string;
	card_data?: string;
}

export default class UserForm extends React.Component<WithStyles<typeof styles> & IFormState & IApiContext, IUserFormState> {

	constructor(props: any) {
		super(props)
		this.state = {
			first_name: "",
			last_name: "",
			// tslint:disable-next-line:object-literal-sort-keys
			card_data: "dxqffdfdg"
		}
	}

	public componentDidMount() {
		if (this.props.socket) {
			this.props.socket.on("nfc.data", (data: string) => {
				this.state = {
					card_data: data
				}
				this.setState(this.state)
			})
		}
	}

	public componentWillUnmount() {
		if (this.props.socket) {
			this.props.socket.removeListener("nfc.data")
		}
	}
	public validateForm = () => {
		Yup.object().shape({
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
	}
	public handleSubmit = () => {
		// this.props.api.addUsers()
		// this.props.
	}

	public render() {
		const { classes } = this.props;
		// const {
		// 	values,
		// 	errors,
		// 	handleChange,
		// 	// tslint:disable-next-line:no-shadowed-variable
		// 	handleSubmit } = this.props;
		// 	console.log(errors)
		// 	console.log(values)
		return (
			<div className={classes.container}>

				<h1>Register User</h1>
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
						type="text"
						readOnly={true}
						onChange={handleChange}
						value={this.state.card_data}
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

