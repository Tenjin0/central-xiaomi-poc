import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import usersReducer from "./usersReducer"

const reducer = combineReducers({
	users: usersReducer,
	// tslint:disable-next-line:object-literal-sort-keys
	routerReducer
})

export default reducer
