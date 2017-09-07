import { Router } from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import serverConfig from './config';
import utils from './utils';
import webpackConfig from './../webpack.config';

const isProduction = process.env.NODE_ENV === 'production';
const outputFile = webpackConfig.output.filename;
const router = new Router();
const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, serverConfig.uploads);
    },
    filename: (request, file, callback) => {
        let filename = file.originalname;
        if (file.mimetype.match('video/.*'))
            filename = `${filename}.mp4`;
        console.info(`Uploading file... ${filename}`);
        callback(null, filename);
    }
});
const upload = multer({ storage });

// Routes
router.get('/', (req, res) => {
    res.render('index', {
        bundle: (isProduction ? '/' : 'http://localhost:8080/') + outputFile,
        title: 'PiZilla'
    });
});

router.post('/upload', upload.any(), (req, res) => {
    return res.status( 200 ).send(req.files);
});

router.get('/download', (req, res) => {
    if (!req.query.path) res.end();
    else {
        const filePath = path.resolve(req.query.path);
        const isFile = fs.statSync(filePath).isFile();
        if (isFile) res.download(filePath);
    }
});

router.get('/files', (req, res) => {
    let curDir = serverConfig.uploads;
    const query = req.query.path || '';
    if (query) curDir = path.resolve(query);
    utils.getFileList(curDir).then((data) => {
        if (data === null)
            res.json({ 'error': `Access denied: '${curDir}'` }).end(403);
        else
            res.json(data);
    });
});

export default router;
