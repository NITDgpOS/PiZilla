import { readdirAsync, statAsync } from './utils';
import fs from 'fs';
import path from 'path';
import serverConfig from './config';

function cleanUp (dir) {
    readdirAsync(dir).then((files) => {
        files.forEach((file) => {
            statAsync(path.join(dir, file)).then((stat) => {
                const deadline = Date.now() - Date.parse(stat.mtime);
                const deadlineHours = deadline / (3600 * 1000);
                if (stat.isDirectory())
                    cleanUp(path.join(dir, file));
                else if (deadline >= serverConfig.deadline) {
                    fs.unlinkSync(path.join(dir, file));
                    console.info(`Deleted file...${file}`);
                }
            });
        });
    }).catch((err) => console.error(err));
}

export default {
    cleanUp
};
