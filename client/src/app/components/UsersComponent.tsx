import { IntegratedPaging } from '@devexpress/dx-react-grid';
import { CustomPaging, PagingState, SearchState } from '@devexpress/dx-react-grid';
import { Grid, PagingPanel, SearchPanel, Table, TableHeaderRow, Toolbar } from '@devexpress/dx-react-grid-material-ui';

import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import * as React from 'react';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { DEFAULT_DEBOUNCE_TIME, DEFAULT_FILTER, DEFAULT_PAGE, PAGE_SIZES } from '../../config';
import { IUsersContainerProps } from '../containers/UsersContainer'

export interface IUsersState {
	filter: string
}

export default class UsersComponent extends React.PureComponent<IUsersContainerProps, IUsersState> {

	private inputSearch = new Subject<string>();

	constructor(props: IUsersContainerProps) {
		super(props);
		this.state = {
			filter: DEFAULT_FILTER
		}
	}

	public componentDidMount() {

		this.loadData(this.state.filter, this.props.pagination.perPage, this.props.pagination.currentPage)

		this.inputSearch.pipe(
			debounceTime(DEFAULT_DEBOUNCE_TIME)
		).subscribe((input: string) => {

			if (this.state.filter !== input) {

				this.loadData(input, this.props.pagination.perPage, this.props.pagination.currentPage)
				this.setState({
					...this.state,
					filter: input
				})
			}
			// return this.changeSearchValue(input);
		});


	}

	public onClickUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {

		this.props.history.push("/user/" + e.currentTarget.dataset.id)
	}

	public changeCurrentPage = (currentPage: number): void => {

		if (currentPage + 1 !== this.props.pagination.currentPage) {
			this.loadData(this.state.filter, this.props.pagination.perPage, currentPage)
		}

	}

	public onPageSizeChange = (pageSize: number): void => {

		this.loadData(this.state.filter, pageSize, this.props.pagination.currentPage)
	}

	public loadData = async (filter: string, perPage: number, page: number): Promise<void> => {
		if (!this.props.isLoading) {
			await this.props.requestUsers(filter, perPage, page)
		}

	}

	public changeSearchValue = async (searchValue: string): Promise<void> => {

		this.inputSearch.next(searchValue);
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
					rows={this.props.data}
					columns={[
						{ name: 'id', title: 'ID' },
						{ name: 'first_name', title: 'First name' },
						{ name: 'last_name', title: 'Last name' },
						{ name: 'action', title: 'Action' }
					]}>
					<SearchState
						onValueChange={this.changeSearchValue}
					/>
					<PagingState
						currentPage={this.props.pagination.currentPage}
						defaultCurrentPage={DEFAULT_PAGE}
						pageSize={this.props.pagination.perPage}
						onCurrentPageChange={this.changeCurrentPage}
						onPageSizeChange={this.onPageSizeChange}
					/>
					<CustomPaging
						totalCount={this.props.pagination.totalDatas}
					/>
					<IntegratedPaging />
					<Toolbar />
					<SearchPanel />
					<Table
						cellComponent={Cell}
					/>
					<TableHeaderRow />
					<PagingPanel
						pageSizes={PAGE_SIZES}
					/>

				</Grid>
			</div>
		);
	}
}
