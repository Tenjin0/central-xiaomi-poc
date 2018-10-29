import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { Button } from '@material-ui/core';
import * as React from 'react';
import { IUser } from '../constants/interface';

export interface IUsersComponentProps {
	users: IUser[],
	history: any
}

export default class UsersComponent extends React.Component<IUsersComponentProps, any> {

	public onClickUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
		this.props.history.push("/user/" + e.currentTarget.dataset.id)
	}

	public render() {

		const Cell = (props: any) => {

			const { column } = props;

			if (column.name === 'action') {
			  return <Table.Cell {...props} ><Button data-id={props.row.id} onClick={this.onClickUpdate}> Edit </Button></Table.Cell>;
			} 
			return <Table.Cell {...props} />;
		};
	
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
					
					<Table
						cellComponent={Cell}
					/>
					<TableHeaderRow />
				</Grid>
			</div>
		);
	}
}
