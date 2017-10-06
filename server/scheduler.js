import { readdirAsync, statAsync, unlinkAsync } from './utils';
import path from 'path';
import serverConfig from './config';

const cleanUp = async (dir) => {
    try {
        const files = await readdirAsync(dir);
        files.forEach(async (file) => {
            const stat = await statAsync(path.join(dir, file));
            const deadline = Date.now() - Date.parse(stat.mtime);
            const deadlineHours = deadline / (3600 * 1000);
            if (stat.isDirectory())
                cleanUp(path.join(dir, file));
            else if (deadlineHours >= serverConfig.deadline) {
                await unlinkAsync(path.join(dir, file));
                console.info(`DELETED FILE... ${file}`);
            }
        });
    } catch (err) {
        console.error(err);
    }
};

export default {
    cleanUp
};
