import { createMuiTheme, MuiThemeProvider, Typography } from '@material-ui/core';
import { blue, pink } from '@material-ui/core/colors';
import CssBaseline from "@material-ui/core/CssBaseline";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {
	ConnectedRouter
} from 'react-router-redux'
import {api, socket} from './app/service/api'
import { ApiContextProvider } from './app/service/apiContext';
import store, { history } from './app/store'

import App from './app/App';

import "./app/styles/main.scss";


declare let module: any


const theme = createMuiTheme({
	palette: {
		primary: blue,
		secondary: pink
	},
	typography: {
		useNextVariants: true
	}
})

ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<CssBaseline/>
		<ApiContextProvider value={{api, socket}}>
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<App history={history}/>
				</ConnectedRouter>
			</Provider>
		</ApiContextProvider>
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
