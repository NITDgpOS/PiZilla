import fs from 'fs';
import mime from 'mime';
import path from 'path';

export const promisify = (fn) => {
    return (...args) => new Promise((resolve, reject) => {
        const callback = (err, data) => {
            return err ? reject(err) : resolve(data);
        };
        return fn.apply(this, [...args, callback]);
    });
};

export const readdirAsync = promisify(fs.readdir);
export const statAsync = promisify(fs.stat);
export const unlinkAsync = promisify(fs.unlink);

export const getFileList = async (dir) => {
    try {
        const files = await readdirAsync(dir);
        const data = await Promise.all(files.map(async (file) => {
            const stat = await statAsync(path.join(dir, file));
            const isDirectory = stat.isDirectory();
            return {
                extension: isDirectory ? null : path.extname(file),
                isDirectory,
                mime: mime.lookup(file),
                name: file,
                path: path.resolve(dir, file)
            };
        }));
        return data.sort((a, b) => a.name.localeCompare(b.name));
    } catch (err) {
        console.error(err);
    }
    return null;
};
