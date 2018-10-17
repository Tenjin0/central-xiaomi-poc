import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { blue, pink } from '@material-ui/core/colors';
import CssBaseline from "@material-ui/core/CssBaseline";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {
	ConnectedRouter
} from 'react-router-redux'
import api from './app/service/api'
import { ApiContextProvider } from './app/service/apiContext';
import store, { history } from './app/store'

import io from 'socket.io-client';

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
		<ApiContextProvider value={{api}}>
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


const socket = io('http://localhost:3001');
const clientSocket = io('/client');

clientSocket.on('connect', () => {
	console.log("connect to central")
});
clientSocket.on('nfc.data', (data: any) => {
	console.log(data)
});
clientSocket.on('disconnect', () => {
	console.log("disconnect from central")
});
