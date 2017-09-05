import file from './files';

const reducers = [
    file
];

export default (state, action) =>
    reducers.reduce((currentState, reducer) =>
        reducer(currentState, action), state);
