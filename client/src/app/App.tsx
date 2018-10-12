import * as React from 'react';
import { Route, Switch } from "react-router-dom"

import Hello from "./components/Hello"
import Home from "./components/Home"
import Navigation from "./components/Navigation"
import UsersContainer from "./containers/Users"

// export interface IAppProps {
// }
export default class App extends React.Component<{}, any> {
	public render() {
		return (
			<div>
				<Navigation/>
				<Switch>
					<Route exact={true} path="/" component={Home} />
					<Route path="/hello" component={Hello} />
					<Route exact={true} path="/users" component={UsersContainer} />
				</Switch>
			</div>
		);
	}
}
