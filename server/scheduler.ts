import { readdirAsync, statAsync, unlinkAsync } from './utils';
import { join } from 'path';
import serverConfig from './config';

const cleanUp = async (dir: string) => {
    try {
        const files = await readdirAsync(dir);
        files.forEach(async (file: string) => {
            const stat = await statAsync(join(dir, file));
            const deadline = Date.now() - new Date(stat.mtime).getMilliseconds();
            const deadlineHours = deadline / (3600 * 1000);
            if (stat.isDirectory())
                cleanUp(join(dir, file));
            else if (deadlineHours >= serverConfig.deadline) {
                await unlinkAsync(join(dir, file));
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
