import { applyMiddleware, createStore, Middleware, Store } from 'redux';
import { createLogger } from 'redux-logger';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import { IAppState } from './../reducers/files';
import { mainReducer } from './../reducers/index';

const middleware: Middleware[] = [promise(), thunk, createLogger()];
if (process.env.NODE_ENV === 'production') {
    middleware.pop();
}

export const store: Store<IAppState> = createStore(mainReducer, applyMiddleware(...middleware));
