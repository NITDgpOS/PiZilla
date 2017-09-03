import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import promise from 'redux-promise-middleware';
import reducer from './../reducers';
import thunk from 'redux-thunk';

const middleware = [promise(), thunk, createLogger()];
if (process.env.NODE_ENV === 'production')
    middleware.pop();

export default createStore(reducer, applyMiddleware(...middleware));
