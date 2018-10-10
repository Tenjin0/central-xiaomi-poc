import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import usersReducer from "./usersReducer"

const reducer = combineReducers({
	users: usersReducer,
	routerReducer
})

export default reducer
