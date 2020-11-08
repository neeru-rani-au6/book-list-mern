import { createStore, combineReducers, applyMiddleware } from 'redux';
import userReducer from './reducer/user';
import bookReducer from './reducer/book';
import thunk from 'redux-thunk';
const rootReducer = combineReducers({ userReducer, bookReducer });
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;