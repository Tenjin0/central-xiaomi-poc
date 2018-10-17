import * as React from 'react';
import UserForm from '../components/UserForm'
import {ApiContextConsumer} from '../service/apiContext'
export default class UserFormContainer extends React.Component<any, any> {

	public render() {
		
		return (
			<ApiContextConsumer>
					{
						apiContext => <UserForm {...this.props} {...apiContext} />
					}
				</ApiContextConsumer>
		);
	}
}


