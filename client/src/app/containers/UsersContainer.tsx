
import * as React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk'
import { getUsers } from "../actions/users"
import UsersComponent from '../components/UsersComponent'
import { IAppState, IListWithPagination, IUser } from '../constants/interface';

export interface IUsersProps extends IListWithPagination<IUser> {

	requestUsers: (filter:string, perPage: number, page: number) => Promise<void>
	history: any
}

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
