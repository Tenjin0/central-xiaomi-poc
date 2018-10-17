import * as React from 'react';
import { Redirect, Route, Switch } from "react-router-dom"
import { RouteComponentProps, withRouter } from 'react-router-dom';

import Hello from "./components/Hello"
import Home from "./components/Home"
import UserForm from "./components/UserForm"
import Nav from "./containers/Nav"
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
					<Route exact={true} path="/user" component={UserForm} />
					<Route exact={true} path="/user/:id" component={UserForm} />
					<Route exact={true} path="/users" component={UsersContainer} />
					<Redirect from='*' to='/' />
				</Switch>
			</div>
		);
	}
}
