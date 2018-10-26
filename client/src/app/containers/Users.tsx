
import * as React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk'
import { getUsers } from "../actions/users"
import UsersComponent from '../components/Users'
import { IFormState, IUser } from '../constants/interface';

export interface IUsersContainerProps extends IFormState {

	requestUsers: (args?:any) => Promise<void>
	data: IUser[],
	history: any
}



class UsersContainer extends React.Component<IUsersContainerProps, any> {

	public componentDidMount() {

		this.props.requestUsers()
	}

	public render() {
		console.log(this.props)
		const users = this.props.data || []
		return (
			<div>
				<UsersComponent history={this.props.history} users={users} />
			</div>
		);
	}
}

const mapStateToProps = (state: any) => {
	console.log(state)
	return {
		...state.users,
	}
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, void, Action>) => {
	return {
		requestUsers: (arg?: any) => dispatch(getUsers(arg)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
