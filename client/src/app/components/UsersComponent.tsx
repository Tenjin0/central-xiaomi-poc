import { IntegratedPaging } from '@devexpress/dx-react-grid';
import { CustomPaging, PagingState } from '@devexpress/dx-react-grid';
import { Grid, PagingPanel, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';

import { Button } from '@material-ui/core';
import * as React from 'react';
import { DEFAULT_PER_PAGE, PAGE_SIZES } from '../../config';
import { IPagination, IUser } from '../constants/interface';

export interface IUsersComponentProps {
	users: IUser[],
	history: any
	pagination: IPagination
	requestUsers: (filter:string, perPage: number, page: number) => Promise<void>

}

interface IUsersState {
	filter: string
	pageSize: number
}

export default class UsersComponent extends React.Component<IUsersComponentProps, IUsersState> {

	constructor(props: IUsersComponentProps) {
		super(props);
		this.state = {
			filter: "",
			pageSize: DEFAULT_PER_PAGE,
		}
	}
	public onClickUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
		this.props.history.push("/user/" + e.currentTarget.dataset.id)
	}

	public changeCurrentPage = (currentPage: number): void => {
		console.log(currentPage);
	}

	public onPageSizeChange = (pageSize: number): void => {
		console.log(pageSize);
		this.setState({
			...this.state,
			pageSize
		})
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
						pageSize={this.state.pageSize}
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
