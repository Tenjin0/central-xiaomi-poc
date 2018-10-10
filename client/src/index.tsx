import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {
	ConnectedRouter
} from 'react-router-redux'

import store, { history } from './app/store'

import App from './app/App';

declare let module: any

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App />
		</ConnectedRouter>
	</Provider>,
document.getElementById('root'));


if (module.hot) {
	module.hot.accept();
 }
