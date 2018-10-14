import MUIDataTable from "mui-datatables";
import * as React from 'react';
import { IUser } from '../constants/interface';

export interface IUsersComponentProps {
	users: IUser[]
}


export default class UsersComponent extends React.Component<IUsersComponentProps, any> {

	public render() {
		const columns = ["Name", "Company", "City", "State"];

		const data = [
			["Joe James", "Test Corp", "Yonkers", "NY"],
			["John Walsh", "Test Corp", "Hartford", "CT"],
			["Bob Herm", "Test Corp", "Tampa", "FL"],
			["James Houston", "Test Corp", "Dallas", "TX"],
		];

		const options = {
			filterType: 'checkbox',
		};
		return (
			<MUIDataTable
				title={"Employee List"}
				data={data}
				columns={columns}
				options={options}
			/>
		);
	}
}
