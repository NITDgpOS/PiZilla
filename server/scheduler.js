import { readdirAsync, statAsync } from './utils';
import fs from 'fs';
import path from 'path';
import serverConfig from './config';

function cleanUp (dir) {
    readdirAsync(dir).then((files) => {
        files.forEach((file) => {
            statAsync(path.join(dir, file)).then((stat) => {
                const deadline = Date.now() - stat.mtimeMs;
                if (stat.isDirectory())
                    cleanUp(file);
                else if (deadline >= serverConfig.deadline)
                    fs.unlink(path.join(dir, file));
            });
        });
    }).catch((err) => console.error(err));
}

export default {
    cleanUp
};
