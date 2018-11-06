import { IntegratedPaging } from '@devexpress/dx-react-grid';
import { CustomPaging, PagingState } from '@devexpress/dx-react-grid';
import { Grid, PagingPanel, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';

import { Button } from '@material-ui/core';
import * as React from 'react';
import { DEFAULT_PER_PAGE, PAGE_SIZES } from '../../config';
import { IPagination, IUser } from '../constants/interface';

export interface IUsersComponentProps {
	users: IUser[],
	filter: string,
	history: any
	pagination: IPagination
	requestUsers: (filter:string, perPage: number, page: number) => Promise<void>

}

export default class UsersComponent extends React.PureComponent<IUsersComponentProps, {}> {

	constructor(props: IUsersComponentProps) {
		super(props);

	}
	public onClickUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
		this.props.history.push("/user/" + e.currentTarget.dataset.id)
	}

	public changeCurrentPage = (currentPage: number): void => {
		if (currentPage + 1 !== this.props.pagination.currentPage) {
			console.log(currentPage, this.props.pagination.currentPage, currentPage + 1 !== this.props.pagination.currentPage)
			this.props.requestUsers(this.props.filter, this.props.pagination.perPage, this.props.pagination.currentPage + 1)
		}

	}

	public onPageSizeChange = (pageSize: number): void => {
		console.log("onPageSizeChange", pageSize, this.props.pagination.perPage);

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
					<PagingState
						currentPage={this.props.pagination.currentPage}
						pageSize={this.props.pagination.perPage}
						onCurrentPageChange={this.changeCurrentPage}
						onPageSizeChange={this.onPageSizeChange}
					/>
					<CustomPaging
						totalCount={this.props.pagination.totalDatas}
					/>
					<IntegratedPaging />
					<IntegratedPaging />
					<Table
						cellComponent={Cell}
					/>
					<PagingPanel 
						pageSizes={PAGE_SIZES}
					/>
					<TableHeaderRow />
				</Grid>
			</div>
		);
	}
}
