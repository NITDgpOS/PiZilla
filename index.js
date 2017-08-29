var _ = require('underscore')
var path = require('path')
var express = require('express')
var fs = require('fs')
var http = require('http')
var mustacheExpress = require('mustache-express')
var app = express()
const port = 8000

app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(__dirname))

app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
app.set('views', './views')

app.get('/', (req, res) => {
    res.render('index', {
        'title': 'PiZilla'
    })
})

app.get('/files', (req, res) => {
    var curDir = process.cwd()
    var query = req.query.path || ''
    if (query)
        curDir = path.resolve(query)
    console.log('browsing ', curDir, '...')
    fs.readdir(curDir, (err, files) => {
        if (err)
            throw err;
        var data = [];
        files.forEach(file => {
            try {
                var isDirectory = fs.statSync(path.join(curDir, file))
                                    .isDirectory()
                if (isDirectory) {
                    data.push({
                        name: file,
                        isDirectory: true,
                        path: path.join(query, file)
                    })
                } else {
                    data.push({
                        name: file,
                        extension: path.extname(file),
                        isDirectory: false,
                        path: path.join(query, file)
                    })
                }
            } catch (e) {
                console.error(e)
            }
        })
        data = _.sortBy(data, file => file.name)
        res.json(data)
    })
})

app.listen(port, () => {
    console.log(`Server started and listening on port ${port}`)
})
