import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {
	ConnectedRouter
} from 'react-router-redux'

import store, { history } from './store'

import { Hello } from './components/Hello';


declare let module: any

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Hello compiler="Typescript" framework="React" bundler="Webpack" />
		</ConnectedRouter>
	</Provider>,
document.getElementById('root'));


if (module.hot) {
	module.hot.accept();
 }
