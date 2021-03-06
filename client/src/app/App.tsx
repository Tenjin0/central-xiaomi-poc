import * as React from 'react';
import { Redirect, Route, Switch } from "react-router-dom"

import Hello from "./components/Hello"
import Home from "./components/Home"
import Test from './components/Test';
import CamerasArchiveContainer from "./containers/CameraArchiveContainer"
import Nav from "./containers/NavigationContainer"
import UserFormContainer from "./containers/UserFormContainer"
import UsersContainer from "./containers/UsersContainer"

export interface IAppProps {
	history: any
}
export default class App extends React.Component<IAppProps, any> {

	public render() {

		return (
			<React.Fragment>
				<Nav />
				<Switch>
					<Route exact={true} path="/" component={Home} />
					<Route exact={true} path="/hello" component={Hello} />
					<Route exact={true} path="/test" component={Test} />
					<Route exact={true} path="/user" component={UserFormContainer} />
					<Route exact={true} path="/user/:id" component={UserFormContainer} />
					<Route exact={true} path="/users" component={UsersContainer} />
					<Route exact={true} path="/camera/archive" component={CamerasArchiveContainer} />
					<Redirect from='*' to='/' />
				</Switch>
			</React.Fragment>
		);
	}
}
