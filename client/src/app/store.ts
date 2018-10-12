import createHistory from 'history/createBrowserHistory'
import {
	routerMiddleware,
} from 'react-router-redux'
import { applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import reducer from "./reducers"
export const history = createHistory()

const enhancers = []
const middleware = [
	thunk,
	routerMiddleware(history)
]

interface IMyWindow extends Window {
	process: any;
	__REDUX_DEVTOOLS_EXTENSION__(): any;
}

declare var window: IMyWindow;

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
