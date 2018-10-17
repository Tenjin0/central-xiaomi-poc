import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import formReducer from "./formReducer"
import usersReducer from "./usersReducer"

const reducer = combineReducers({
	form: formReducer,
	users: usersReducer,
	// tslint:disable-next-line:object-literal-sort-keys
	routerReducer
})

export default reducer
