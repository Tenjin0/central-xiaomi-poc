import { createStore, applyMiddleware, compose } from 'redux'
import {
    routerMiddleware,
} from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import reducer from "./reducers"
export const history = createHistory()

const enhancers = []
const middleware = [
	thunk,
	routerMiddleware(history)
]

interface MyWindow extends Window {
	__REDUX_DEVTOOLS_EXTENSION__(): any;
	process: any;
}

declare var window: MyWindow;

// if (window.process.env.NODE_ENV === 'development') {
	const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

	if (typeof devToolsExtension === 'function') {
		enhancers.push(devToolsExtension())
	}
// }

const composedEnhancers = compose(
	applyMiddleware(...middleware),
	...enhancers
)

const store = createStore(
	reducer,
	composedEnhancers
)

export default store
