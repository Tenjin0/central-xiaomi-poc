import { Formik } from 'formik';
import * as React from 'react';

export interface IUserFormProps {
}

export default class IUserForm extends React.Component<IUserFormProps, any> {

	public handleSubmit = (values: any, actions:any) => {
		setTimeout(() => {
			alert(JSON.stringify(values, null, 2));
			actions.setSubmitting(false);
		}, 1000);
	}

	public renderForm = (props: any) => {

		console.log(props)
		return (<form onSubmit={props.handleSubmit}>
			<input
				type="text"
				onChange={props.handleChange}
				onBlur={props.handleBlur}
				value={props.values.name}
				name="name"
			/>
			{props.errors.name && <div id="feedback">{props.errors.name}</div>}
			<button type="submit">Submit</button>
		</form>)
	}

	public render() {
		return (
			<div>
				<h1>My Form</h1>
				<Formik
					initialValues={{ name: 'jared' }}
					onSubmit={this.handleSubmit}
					render={this.renderForm}
				/>
			</div>
		);
	}
}
