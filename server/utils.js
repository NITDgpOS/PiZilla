import Promise from 'bluebird';
import _ from 'underscore';
import fs from 'fs';
import mime from 'mime';
import path from 'path';

export const readdirAsync = Promise.promisify(fs.readdir);
export const statAsync = Promise.promisify(fs.stat);

export async function getFileList(dir) {
    try {
        const files = await readdirAsync(dir);
        const data = files.map((file) => {
            const isDirectory = fs.statSync(path.join(dir, file)).isDirectory();
            return {
                extension: isDirectory ? null : path.extname(file),
                isDirectory,
                mime: mime.lookup(file),
                name: file,
                path: path.resolve(dir, file)
            };
        });
        return _.sortBy(data, (file) => file.name);
    } catch (err) {
        console.error(err);
    }
    return null;
}
