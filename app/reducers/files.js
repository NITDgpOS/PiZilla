import config from './../../server/config';
import keys from './../misc/keys';

export default (state = {
    files: [],
    path: config.uploads
}, payload) => {
    switch (payload.type) {
        case (keys.CHANGE_FOLDER): {
            return { ...state, path: payload.path };
        }
        case (keys.UPDATE_FILES): {
            return { ...state, files: payload.files };
        }
    }
    return state;
};
