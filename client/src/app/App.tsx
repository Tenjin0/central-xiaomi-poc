import * as React from 'react';
import { Route, Switch } from "react-router-dom"

import Home from "./components/Home"
import Hello from "./components/Hello"
import UsersContainer from "./containers/Users"

export interface AppProps {
}
export default class App extends React.Component<AppProps, any> {
	public render() {
		return (
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/hello" component={Hello} />
				<Route exact path="/users" component={UsersContainer} />
			</Switch>
		);
	}
}
