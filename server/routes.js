import bodyparser from 'body-parser';
import { getFileList, statAsync } from './utils';
import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import serverConfig from './config';
import shell from 'shelljs';
import webpackConfig from './../webpack.config';


const urlencodedParser = bodyparser.urlencoded({ extended: true });
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
        console.info(`UPLOADING FILE... ${filename}`);
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

    if(response.selection_radio === 'music') {
        type = '-f 140';
    }

    // --embed-thumbnail --add-metadata 
    // shell.exec(`youtube-dl ${type} --get-filename --restrict-filenames --no-warnings --no-check-certificate -o '%(title)s.%(ext)s' ${url}`, (_,filename) => {
    //          filename = filename.slice(0,filename.length - 1);
    // });
    res.redirect('/pifire');

    if (shell.exec(`youtube-dl ${type} --no-check-certificate -c --audio-quality 0 --restrict-filenames --no-warnings --no-check-certificate -o ${file}'%(title)s.%(ext)s' "${url}"`).code !== 0) {
        type = '';
        shell.exec(`youtube-dl ${type} --no-check-certificate -c --recode-video mp4 --restrict-filenames --no-warnings -o ${file}'%(title)s.%(ext)s' "${url}"`);
    }   

});


export default router;
