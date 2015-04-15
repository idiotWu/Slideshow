/**
 * 本地开发时用的代理服务器
 */

var url = require('url'),
    http = require('http'),
    app = require('express')(),
    server = require('http').Server(app);

app.use(function (req, res) {
    var path = url.parse(req.url).pathname;

    if (path.indexOf('/src') > -1) {
        return res.sendFile(path, {
            root: __dirname
        });
    }

    var file = path === '/' ? 'index.html' : path;

    res.sendFile(file, {
        root: __dirname + '/build'
    });
});

server.listen(80, function() {
    console.log('Proxy Server Listening on 127.0.0.1:80');
});