import { CronJob } from 'cron';
import * as express from 'express';
import * as path from 'path';
import { config as serverConfig } from './config';
import { router } from './routes';
import { cleanUp } from './scheduler';

const app = express();
app.use('/pifire-static', express.static(path.resolve('.', 'app/assets')));
app.use('/view', express.static(serverConfig.uploads));
app.use(express.static(path.relative('.', 'public')));
app.set('views', path.relative('.', 'views'));
app.set('view engine', 'ejs');

app.use(router);
app.listen(serverConfig.port, () => {
    console.info('EXPRESS SERVER STARTED AT ' +
        `http://localhost:${serverConfig.port}/`);
});

const _ = new CronJob({
    cronTime: serverConfig.deleteSchedule,
    onTick: () => {
        console.info('RUNNING CLEANUP SCHEDULE...');
        cleanUp(serverConfig.uploads);
    },
    runOnInit: true,
    start: true,
    timeZone: 'Asia/Kolkata',
});

export default app;
