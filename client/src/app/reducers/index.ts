import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import camerasReducer from './camerasReducer';
import formReducer from "./formReducer"
import usersReducer from "./usersReducer"

const reducer = combineReducers({
	form: formReducer,
	// tslint:disable-next-line:object-literal-sort-keys
	camerasRequest: camerasReducer,
	usersRequest: usersReducer,
	// tslint:disable-next-line:object-literal-sort-keys
	routerReducer
})

export default reducer
