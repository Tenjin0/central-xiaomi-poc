import { WithStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import * as React from 'react';
import * as Yup from 'yup';
import { IFormState, IUser, IUserData } from '../constants/interface'
import { styles } from '../containers/UserForm'
import { IApiContext } from '../service/apiContext';


interface IUserFormState extends IUser {
	formErrors: IUserData
}

export default class UserForm extends React.Component<WithStyles<typeof styles> & IFormState & IApiContext, IUserFormState> {

	private validateForm: Yup.Schema<any>

	constructor(props: any) {

		super(props)

		this.state = {
			id: 0,
			// tslint:disable-next-line:object-literal-sort-keys
			first_name: "",
			last_name: "",
			// tslint:disable-next-line:object-literal-sort-keys
			card_data: "",
			formErrors: { first_name: '', last_name: '', card_data: '' },
		}

		this.validateForm = Yup.object().shape({
			first_name: Yup.string()
				.min(3, 'Need at least 3 characters')
				.required('Required'),
			last_name: Yup.string()
				.min(3, 'Need at least 3 characters')
				.required('Required'),
			// tslint:disable-next-line:object-literal-sort-keys
			card_data: Yup.string()
				.required('Required'),
		});
	}

	public componentDidMount() {

		if (this.props.socket) {
			this.props.socket.on("nfc.data", (data: string) => {
				this.state = {
					...this.state,
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


	public handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

		e.preventDefault()
		const user: IUserData = {
			first_name: this.state.first_name,
			last_name: this.state.last_name,
			// tslint:disable-next-line:object-literal-sort-keys
			card_data: this.state.card_data
		}
		this.props.api.addUsers(user).then((data) => {
			console.log(data)
		}).catch((err) => {
			console.log(err)
		})
		// this.props.
	}

	public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

		const key: string = e.target.id;
		this.state[key] = e.target.value
		this.setState(this.state);
		this.validateForm.validate(this.state, { abortEarly: false })
		.catch((err: Yup.ValidationError) => {
			const fieldsErrors = err.inner
			for (const iterator of fieldsErrors) {
				this.state.formErrors[iterator.path] = iterator.message
			}
			this.setState(this.state)
		})
	}

	public render() {
		console.log(Object.keys(this.props))
		const { classes } = this.props;

		return (
			<div className={classes.container}>

				<h1>Register User</h1>
				<form className={classes.form} onSubmit={this.handleSubmit}>
					<TextField
						id="first_name"
						name="first_name"
						label="first name"
						className={classes.textField}
						value={this.state.first_name}
						onChange={this.handleChange}
						error={this.state.formErrors.first_name.length > 0}
						helperText={this.state.formErrors.first_name}
						margin="normal"
						variant="outlined"
					/>
					<TextField
						id="last_name"
						name="last_name"
						label="last name"
						className={classes.textField}
						value={this.state.last_name}
						onChange={this.handleChange}
						margin="normal"
						variant="outlined"
						error={this.state.formErrors.last_name.length > 0}
						helperText={this.state.formErrors.last_name}
					/>
					<input
						id="card_data"
						name="card_data"
						type="text"
						readOnly={true}
						value={this.state.card_data}
						onChange={this.handleChange}
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

