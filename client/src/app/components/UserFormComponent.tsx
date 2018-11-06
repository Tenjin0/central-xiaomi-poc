import { WithStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import * as React from 'react';
import * as Yup from 'yup';
import { IFormState, IUser } from '../constants/interface'
import { IUserFormDispatch, styles } from '../containers/UserFormContainer'
import { IApiContext } from '../service/apiContext';


interface IUserFormState extends IUser {
	formErrors: IUser
	action: string // replace by type ADD/UPDATE
}


interface IUserFormProps {
	match: any
}

export default class UserForm extends React.PureComponent<WithStyles<typeof styles> & IFormState & IApiContext & IUserFormDispatch & IUserFormProps, IUserFormState> {

	private validateForm: Yup.Schema<any>
	private formErrorsInit: IUser

	constructor(props: any) {

		super(props)

		this.formErrorsInit = { first_name: '', last_name: '', card_data: '' }

		this.state = {
			id: -1,
			// tslint:disable-next-line:object-literal-sort-keys
			first_name: "",
			last_name: "",
			// tslint:disable-next-line:object-literal-sort-keys
			card_data: "azeqsd",
			action: "",
			formErrors: {
				...this.formErrorsInit
			},
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

	public async componentDidMount() {
		if (this.props.socket) {
			this.props.socket.on("nfc.data", (data: string) => {
				this.state = {
					...this.state,
					card_data: data
				}
				this.setState(this.state)
			})
		}
		if (this.props.match.params && this.props.match.params.id) {
			this.state = {
				...this.state,
				action: "UPDATE"
			}
			this.props.api.getUser(this.props.match.params.id).then(async (data: IUser) => {
				this.state = {
					...this.state,
					...data
				}
				this.setState(this.state)
				this.props.dispatchFormLoadSuceeded()
				
			}).catch((err: any) => {
				this.props.dispatchFormFailed()
				// display error message
			})
			this.props.dispatchFormSubmiting()

		} else {
			this.state = {
				...this.state,
				action: "ADD"
			}
		}
		this.setState(this.state)
	}

	public componentWillUnmount() {

		if (this.props.socket) {
			this.props.socket.removeListener("nfc.data")
		}
	}


	public handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

		e.preventDefault()

		const user: IUser = {
			first_name: this.state.first_name,
			last_name: this.state.last_name,
			// tslint:disable-next-line:object-literal-sort-keys
			card_data: this.state.card_data
		}

		if (this.state.action === 'ADD') {
			user.id = this.state.id
		}

		const submitAction = this.state.action === 'ADD' ? this.props.api.createUser : this.props.api.updateUser

		submitAction(user).then(() => {
			this.state = {
				...this.state,
				...this.formErrorsInit,
				formErrors: {
					...this.formErrorsInit
				}
			}
			this.props.dispatchFormLoadSuceeded()
		}).catch((err) => {
			this.props.dispatchFormFailed()
		})

		this.props.dispatchFormSubmiting()
	}

	public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

		const key: string = e.target.id;
		this.state[key] = e.target.value

		this.state = {
			...this.state,
			formErrors: {
				...this.formErrorsInit
			}
		}

		this.validateForm.validate(this.state, { abortEarly: false }).then((value) => {
			this.props.dispatchformIsValid(true);
			this.state = {
				...this.state,
				formErrors: {
					...this.formErrorsInit
				}
			}
			this.setState(this.state)
		})
			.catch((err: Yup.ValidationError) => {
				this.props.dispatchformIsValid(false);
				const fieldsErrors = err.inner

				for (const iterator of fieldsErrors) {
					this.state.formErrors[iterator.path] = iterator.message
				}

				this.setState(this.state)
			})
	}

	public render() {

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
						<Button disabled={true} type="button" variant="text" color="secondary" className={classes.button}>
							Reset
						</Button>
						<Button disabled={!this.props.isValid} type="submit" variant="text" color="primary" className={classes.button}>
							Submit
						</Button>
					</div>
				</form>
			</div>
		);
	}
}

