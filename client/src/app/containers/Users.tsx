
import * as React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk'
import { getUsers } from "../actions/users"

import { IUser, IUsersState } from '../constants/interface';

export interface IUsersContainerProps {

	requestUsers: (args?:any) => Promise<void>
	isLoading: boolean,
	isFailure: boolean,
	data: IUser[]
}



class UsersContainer extends React.Component<IUsersContainerProps, any> {

	public componentDidMount() {

		this.props.requestUsers()
	}

	public render() {
		const users = this.props.data
		return (
			<div>
				Users :
				<ul>
					{
						users && users && users.map((user: IUser, index) => {
							return <li key={"user-" + index}>
								<div>{user.first_name}</div>
								<div>{user.last_name}</div>
								<div>{user.card_content}</div>
							</li>
						})
					}
				</ul>
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
