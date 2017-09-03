import config from './webpack.config';
import express from 'express';
import fs from 'fs';
import { getFileList } from './src/misc/utils';
import multer from 'multer';
import path from 'path';
import serverConfig from './config';

const app = express();
const port = serverConfig.port;
const isProduction = process.env.NODE_ENV === 'production';
const outputFile = config.output.filename;
const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, serverConfig.uploads);
    },
    filename: (request, file, callback) => {
        const filename = file.originalname;
        console.info(`Uploading file... ${filename}`);
        callback(null, filename);
    }
});
const upload = multer({ storage });

app.use('/view', express.static(serverConfig.uploads));
app.use(express.static(path.resolve(__dirname, 'public')));
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {
        bundle: (isProduction ? '/' : 'http://localhost:8080/') + outputFile,
        title: 'PiZilla'
    });
});

app.post('/upload', upload.any(), (req, res) => {
    return res.status( 200 ).send(req.files);
});

app.get('/download', (req, res) => {
    if (!req.query.path) res.end();
    else {
        const filePath = path.resolve(req.query.path);
        const isFile = fs.statSync(filePath).isFile();
        if (isFile) res.download(filePath);
    }
});

app.get('/files', (req, res) => {
    let curDir = __dirname;
    const query = req.query.path || '';
    if (query) curDir = path.resolve(query);
    getFileList(curDir).then((data) => {
        if (data === null)
            res.json({ 'error': `Access denied: '${curDir}'` }).end(403);
        else
            res.json(data);
    });
});

app.listen(port, () => {
    console.info(`Express backend started at http://localhost:${port}/`);
});
