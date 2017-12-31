import { getFileList, statAsync } from './utils';
import { Router } from 'express';
import bodyparser from 'body-parser';
import child_process from 'child_process';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import serverConfig from './config';
import url from 'url';
import webpackConfig from './../webpack.config.babel';


const urlencodedParser = bodyparser.urlencoded({ extended: true });
const isProduction = process.env.NODE_ENV === 'production';
const entryPoint = isProduction ? '/build/' : 'http://localhost:8080/';
const uploadDir = serverConfig.uploads;
const password = 'password';


// file upload configuration
const upload = (req) => {
    const form = new formidable.IncomingForm({
        keepExtensions: true,
        uploadDir
    });
    form.parse(req);
    form.on('fileBegin', (name, file) => {
        const [fileName, fileExt] = file.name.split('.');
        file.path = path.join(uploadDir, `${fileName}.${fileExt}`);
    });
    form.on('fileBegin', (name, file) => {
        console.info(`Uploaded ${file.name}`);
        console.info(`${file.path}`);
        child_process.spawn('zip', ['-P', `${password}`, `${file.path.split('.')[0]}.zip`, `${file.path}`]);
    });
    form.on('file', (name, file) => {
        fs.unlinkSync(file.path, (err) => {
            console.info(`File removed ${file.path}`);
            if (err) {
                console.info(err);
            }
        });
    });
};

// Routes
const router = new Router();
router.get('/', (req, res) => {
    res.render('index', {
        bundle: url.resolve(entryPoint, webpackConfig.output.filename),
        title: 'PiZilla'
    });
});

router.post('/upload', (req, res) => {
    upload(req);
    return res.status(200).send(req.files);
});

router.get('/download', async (req, res) => {
    if (!req.query.path) res.end();
    else {
        const filePath = path.resolve(req.query.path);
        const isFile = await statAsync(filePath).isFile();
        if (isFile) res.download(filePath);
    }
});

router.get('/files', async (req, res) => {
    let curDir = serverConfig.uploads;
    const query = req.query.path || '';
    if (query) curDir = path.resolve(query);
    const files = await getFileList(curDir);
    if (files === null)
        res.json({ 'error': `Access denied: ${curDir}` }).end(403);
    else
        res.json(files);
});

router.get('/pifire', (_, res) => {
    res.render('pifire');
});

router.post('/pifire', urlencodedParser, (req, res) => {
    const response = {
        selection_radio: req.body.group1,
        url_input: req.body.url
    };
    const url = response.url_input;
    const file = '/home/vinay/Desktop/PiZilla/uploads/';
    let type = '';

    if (response.selection_radio === 'music') {
        type = '-f 140';
    }

    child_process.exec(`youtube-dl ${type} --no-check-certificate ` +
        '-c --audio-quality 0 --restrict-filenames --no-warnings ' +
        `--no-check-certificate -o ${file}'%(title)s.%(ext)s' ` +
        `"${url}"`, (error) => {
        if (error) console.error(error);
        else exec(`youtube-dl ${type} --no-check-certificate ` +
                '-c --recode-video mp4 --restrict-filenames' +
                ` --no-warnings -o ${file}'%(title)s.%(ext)s' "${url}"`,
        (error) => {
            if (error) console.error(error);
        });
    });

    res.redirect('/pifire');
});

export default router;
