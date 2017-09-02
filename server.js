import _ from 'underscore';
import path from 'path';
import express from 'express';
import fs from 'fs';
import http from 'http';
import config from './webpack.config';
import serverConfig from './config';

const app = express();
const port = serverConfig.port;
const isProduction = process.env.NODE_ENV === 'prod';
const outputFile = config.output.filename;

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {
        title: 'PiZilla',
        bundle: (isProduction ? '/' : 'http://localhost:8080/') + outputFile
    });
});

app.post('/upload', (req, res) => {
    console.log(req);
    res.end();
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
    if (query) {
        curDir = path.resolve(query);
    }
    console.log('browsing ', curDir, '...')
    fs.readdir(curDir, (err, files) => {
        if (err)
            throw err;
        let data = [];
        files.forEach(file => {
            try {
                var isDirectory = fs.statSync(path.join(curDir, file))
                                    .isDirectory()
                data.push({
                    isDirectory,
                    name: file,
                    extension: isDirectory ? null : path.extname(file),
                    path: path.resolve(query, file)
                })
            } catch (e) {
                console.error(e)
            }
        })
        data = _.sortBy(data, file => file.name)
        res.json(data)
    })
})

app.listen(port, () => {
    console.log(`Express backend started at http://localhost:${port}/`)
})
