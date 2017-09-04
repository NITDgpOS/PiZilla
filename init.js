require('fs-lock')({
    file_accessdir: [
        __dirname,
        '/tmp',
	'/root'
    ],
    open_basedir: [
        '/usr/local/share/node_modules',
        '/usr/local/lib/node_modules',
        __dirname
    ]
});
require('babel-register');
require('babel-polyfill');
require('./server');
