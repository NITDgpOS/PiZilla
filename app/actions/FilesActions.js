import fetch from 'isomorphic-fetch';
import keys from './../misc/keys';
import store from './../misc/store';

const changeDirectory = async (path) => {
    if (typeof path === 'undefined') return;
    store.dispatch({ path, type: keys.CHANGE_FOLDER });
    await updateFileList(path);
};

const updateFileList = async (path) => {
    const response = await fetch(`/files?path=${encodeURIComponent(path)}`);
    const files = await response.json();
    store.dispatch({ files, type: keys.UPDATE_FILES });
};

export default {
    changeDirectory,
    updateFileList
};
