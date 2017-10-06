import { AnyAction } from 'redux';
import { IFile } from './../../common/types';
import { keys } from './../misc/keys';

export interface IAppState {
    files: IFile[];
    path: string;
}

export function fileReducer(state: IAppState = { files: [], path: 'uploads' },
                            payload: AnyAction): IAppState {
    switch (payload.type) {
        case (keys.CHANGE_FOLDER): {
            return { ...state, path: payload.path };
        }
        case (keys.UPDATE_FILES): {
            return { ...state, files: payload.files };
        }
    }
    return state;
}
