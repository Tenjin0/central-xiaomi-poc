import {History} from "history"
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import Navigation from "../components/NavigationComponent"

class Nav extends React.Component<RouteComponentProps<any>, any> {
	
  public render() {
	return (
		<Navigation history={this.props.history}/>
	);
  }
}

export default withRouter(Nav)
