import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import promise from 'redux-promise-middleware';
import reducer from './../reducers';
import thunk from 'redux-thunk';

const middleware = applyMiddleware(promise(), thunk, createLogger());
export default createStore(reducer, middleware);
