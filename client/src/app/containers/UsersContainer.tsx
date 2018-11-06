
import * as React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk'
import { getUsers } from "../actions/users"
import UsersComponent from '../components/UsersComponent'
import { IAppState, IFormState, IPagination, IUser } from '../constants/interface';

export interface IUsersContainerProps extends IFormState {

	requestUsers: (filter:string, perPage: number, page: number) => Promise<void>
	data: IUser[]
	filter: string
	pagination: IPagination
	history: any
}

class UsersContainer extends React.PureComponent<IUsersContainerProps, any> {

	public componentDidMount() {

		this.props.requestUsers("", this.props.pagination.perPage, this.props.pagination.currentPage)
	}

	public render() {

		const users: IUser[] = this.props.data || []
		const pagination: IPagination  = this.props.pagination || null

		return (
			<div>
				<UsersComponent history={this.props.history} users={users} pagination={pagination} filter={this.props.filter} requestUsers= {this.props.requestUsers}/>
			</div>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	return {
		data: state.usersRequest.data,
		filte: state.usersRequest.usersFilter,
		pagination: state.usersRequest.pagination
	}
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, void, Action>) => {
	return {
		requestUsers: (filter:string, perPage: number, page: number) => dispatch(getUsers(filter, perPage, page)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
