import * as fs from 'fs';
import * as mime from 'mime';
import { extname, join, resolve } from 'path';
import { promisify } from 'util';
import { IFile } from '../common/types';

export const readdirAsync = promisify(fs.readdir);
export const statAsync = promisify(fs.stat);
export const unlinkAsync = promisify(fs.unlink);

export const getFileList = async (dir: string) => {
    try {
        const files = await readdirAsync(dir);
        const data = await Promise.all(files.map(async (file: string) => {
            const stat = await statAsync(join(dir, file));
            const isDirectory = stat.isDirectory();
            return {
                extension: isDirectory ? undefined : extname(file),
                isDirectory,
                mime: mime.getType(file),
                name: file,
                path: resolve(dir, file),
            };
        }));
        return data.sort((a: IFile, b: IFile) => a.name.localeCompare(b.name));
    } catch (err) {
        console.error(err);
    }
    return null;
};
