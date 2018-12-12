import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import cameraArchivesReducer from './cameraArchivesReducer';
import cameraStreamReducer from './cameraStreamReducer';
import formReducer from "./formReducer"
import usersReducer from "./usersReducer"

const reducer = combineReducers({
	form: formReducer,
	// tslint:disable-next-line:object-literal-sort-keys
	cameraArchives: cameraArchivesReducer,
	cameraStream: cameraStreamReducer,
	usersRequest: usersReducer,
	// tslint:disable-next-line:object-literal-sort-keys
	routerReducer
})

export default reducer
