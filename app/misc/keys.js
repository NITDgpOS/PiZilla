const keys = [
    'ADD_FILE',
    'CHANGE_FOLDER',
    'REFRESH_FOLDER',
    'UPDATE_FILES'
];

export default keys.reduce((o, key) => ({ ...o, [key]: key }), {});
