import { readdirAsync, statAsync, unlinkAsync } from './utils';
import minimatch from 'minimatch';
import path from 'path';
import serverConfig from './config';

const cleanUp = async (dir) => {
    try {
        let files = await readdirAsync(dir);
        // filter all excluded files
        files = files.filter((file) => {
            const checks = serverConfig.excludedFiles.map(
                (pattern) => minimatch(file, pattern)
            );
            return checks.every((val) => val === false);
        });

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
