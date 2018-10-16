import * as react from "react";

import { ApiContextProvider, IApiContext } from './apiContext';
import api from './service/api'

class ApiProvider extends react.Component<{}, IApiContext> {

	constructor(props: any) {
		super(props)
		this.state = {
			api,
		}
	}
	public render() {
		const 
		return (
			// tslint:disable-next-line:no-angle-bracket-type-assertion
			<ApiContextProvider value={this.state}>
				{ this.props.children }
			<ApiContextProvider />
		)
	}
}

export default ApiProvider
