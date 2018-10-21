import * as React from 'react';
import { Redirect, Route, Switch } from "react-router-dom"

import Hello from "./components/Hello"
import Home from "./components/Home"
import Nav from "./containers/Nav"
import UserFormContainer from "./containers/UserForm"
import UsersContainer from "./containers/Users"

export interface IAppProps {
	history: any
}
export default class App extends React.Component<IAppProps, any> {
	public render() {
		return (
			<div>
				<Nav />
				<Switch>
					<Route exact={true} path="/" component={Home} />
					<Route exact={true} path="/hello" component={Hello} />
					<Route exact={true} path="/user" component={UserFormContainer} />
					<Route exact={true} path="/user/:id" component={UserFormContainer} />
					<Route exact={true} path="/users" component={UsersContainer} />
					<Redirect from='*' to='/' />
				</Switch>
			</div>
		);
	}
}
