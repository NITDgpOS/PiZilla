import fs from 'fs';
import mime from 'mime';
import path from 'path';
import { promisify } from 'util';

export const readdirAsync = promisify(fs.readdir);
export const statAsync = promisify(fs.stat);

const getFileList = async (dir) => {
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
        return data.sort((a, b) => a.name.localeCompare(b.name));
    } catch (err) {
        console.error(err);
    }
    return null;
};

export default {
    getFileList
};
