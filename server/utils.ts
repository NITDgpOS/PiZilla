import * as fs from 'fs';
import { getType } from 'mime';
import { join, extname, resolve, ParsedPath } from 'path';
import { promisify } from 'util';

export const readdirAsync = promisify(fs.readdir);
export const statAsync = promisify(fs.stat);
export const unlinkAsync = promisify(fs.unlink);

class File {
    constructor(public extension: string,
                public mime: string,
                public name: string,
                public path: string,
                public isDirectory: boolean) {}
}

export const getFileList = async (dir: string) => {
    try {
        const files = await readdirAsync(dir);
        const data = await Promise.all(files.map(async (file: string) => {
            const stat = await statAsync(join(dir, file));
            const isDirectory = stat.isDirectory();
            return new File(
                isDirectory ? null : extname(file),
                getType(file),
                file,
                resolve(dir, file),
                isDirectory,
            );
        }));
        return data.sort((a: File, b: File) => {
            return a.name.localeCompare(b.name);
        });
    } catch (err) {
        console.error(err);
    }
    return null;
};
