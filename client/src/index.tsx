import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { blue, pink } from '@material-ui/core/colors';
import CssBaseline from "@material-ui/core/CssBaseline";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {
	ConnectedRouter
} from 'react-router-redux'
import store, { history } from './app/store'

import App from './app/App';

declare let module: any


const theme = createMuiTheme({
	palette: {
		primary: blue,
		secondary: pink
	}
})

ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<CssBaseline/>
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<App />
			</ConnectedRouter>
		</Provider>
	</MuiThemeProvider>
,
	document.getElementById('root'));


if (module.hot) {
	module.hot.accept();
	module.hot.accept('./app/reducers', () => {
		const nextRootReducer = require('./app/reducers/index');
		store.replaceReducer(nextRootReducer);
	});
}