import { AnyAction, Reducer } from 'redux';
import { fileReducer, IAppState } from './files';

const reducers: Array<Reducer<IAppState>> = [
    fileReducer,
];

export function mainReducer(state: IAppState, action: AnyAction): IAppState {
    return reducers.reduce((currentState: IAppState, reducer: Reducer<IAppState>): IAppState => {
        return reducer(currentState, action);
    }, state);
}
