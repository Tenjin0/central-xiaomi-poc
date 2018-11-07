
import * as React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk'
import { getUsers } from "../actions/users"
import UsersComponent from '../components/UsersComponent'
import { IAppState, IListWithPagination, IUser } from '../constants/interface';

export interface IUsersContainerProps extends IListWithPagination<IUser> {

	requestUsers: (filter:string, perPage: number, page: number) => Promise<void>
	history: any
}

// class UsersContainer extends React.PureComponent<IUsersContainerProps, any> {

// 	public render() {

// 		const users: IUser[] = this.props.data || []
// 		const pagination: IPagination  = this.props.pagination || null

// 		return (
// 			<div>
// 				<UsersComponent history={this.props.history} users={users} pagination={pagination} requestUsers= {this.props.requestUsers}/>
// 			</div>
// 		);
// 	}
// }

const mapStateToProps = (state: IAppState) => {
	return {
		...state.usersRequest
	}
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, void, Action>) => {
	return {
		requestUsers: (filter:string, perPage: number, page: number) => dispatch(getUsers(filter, perPage, page)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersComponent);
