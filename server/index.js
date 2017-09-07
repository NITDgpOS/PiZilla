import { CronJob } from 'cron';
import express from 'express';
import path from 'path';
import router from './routes';
import scheduler from './scheduler';
import serverConfig from './config';

const app = express();

app.use('/view', express.static(serverConfig.uploads));
app.use(express.static(path.resolve(serverConfig.root, 'public')));
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(router);
app.listen(serverConfig.port, () => {
    console.info('Express backend started at ' +
        `http://localhost:${serverConfig.port}/`);
});


new CronJob({
    cronTime: serverConfig.deleteSchedule,
    onTick: () => {
        console.info('RUNNING CLEANUP SCHEDULE...');
        scheduler.cleanUp(serverConfig.uploads);
    },
    runOnInit: true,
    start: true,
    timeZone: 'Asia/Kolkata'
});
