import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import * as React from 'react';
import { IUser } from '../constants/interface';

export interface IUsersComponentProps {
	users: IUser[]
}


export default class UsersComponent extends React.Component<IUsersComponentProps, any> {

	public render() {
		return (
			<div>
				Users:
				<Grid
					rows={[
						{ id: 0, product: 'DevExtreme', owner: 'DevExpress' },
						{ id: 1, product: 'DevExtreme Reactive', owner: 'DevExpress' },
					]}
					columns={[
						{ name: 'id', title: 'ID' },
						{ name: 'product', title: 'Product' },
						{ name: 'owner', title: 'Owner' },
					]}>
					<Table />
					<TableHeaderRow />
				</Grid>
			</div>
		);
	}
}
