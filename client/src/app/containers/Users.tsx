
import * as React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk'
import { getUsers } from "../actions/users"
import UsersComponent from '../components/Users'
import { IFormState, IUser } from '../constants/interface';

export interface IUsersContainerProps extends IFormState {

	requestUsers: (args?:any) => Promise<void>
	data: IUser[]
}



class UsersContainer extends React.Component<IUsersContainerProps, any> {

	public componentDidMount() {

		this.props.requestUsers()
	}

	public render() {
		const users = this.props.data || []
		return (
			<div>
				<UsersComponent users={users} />
			</div>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		...state.users
	}
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, void, Action>) => {
	return {
		requestUsers: (arg?: any) => dispatch(getUsers(arg)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
