import * as fetch from 'isomorphic-fetch';
import { keys } from './../misc/keys';
import { store } from './../misc/store';

export const changeDirectory = async (path?: string) => {
    if (typeof path === 'undefined') {return; }
    store.dispatch({ path, type: keys.CHANGE_FOLDER });
    await updateFileList(path);
};

export const updateFileList = async (path: string) => {
    const response = await fetch(`/files?path=${encodeURIComponent(path)}`);
    const files = await response.json();
    store.dispatch({ files, type: keys.UPDATE_FILES });
};
