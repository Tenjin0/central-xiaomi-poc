import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import * as React from 'react';
import { IUser } from '../constants/interface';

export interface IUsersComponentProps {
	users: IUser[]
}



export default class UsersComponent extends React.PureComponent<IUsersComponentProps, any> {


	public render() {

		const Cell = (props: any) => {
			console.log(props)
			const { column } = props;
			if (column.name === 'action') {
			  return <Table.Cell {...props} ><button> add </button></Table.Cell>;
			} 
			return <Table.Cell {...props} />;
		  };
	
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
					
					<Table
						cellComponent={Cell}
					/>
					<TableHeaderRow />
				</Grid>
			</div>
		);
	}
}
