import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import * as React from 'react';
import { IUser } from '../constants/interface';

export interface IUsersComponentProps {
	users: IUser[]
}


export default class UsersComponent extends React.Component<IUsersComponentProps, any> {

	public render() {
		console.log(this.props)
		return (
			<div>
				Users:
				<Grid
					rows={this.props.users}
					columns={[
						{ name: 'id', title: 'ID' },
						{ name: 'first_name', title: 'First name' },
						{ name: 'last_name', title: 'Last name' },
						{ name: 'action', title: 'Action'}
					]}>
					<Table />
					<TableHeaderRow />
				</Grid>
			</div>
		);
	}
}
