import { CronJob } from 'cron';
import express from 'express';
import router from './routes';
import scheduler from './scheduler';
import serverConfig from './config';

const app = express();

app.use('/assets', express.static('./assets'));
app.use('/view', express.static(serverConfig.uploads));
app.use('/build', express.static('./build/client'));
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(router);
app.listen(serverConfig.port, () => {
    console.info('EXPRESS SERVER STARTED AT ' +
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
