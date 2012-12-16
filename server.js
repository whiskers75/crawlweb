 /**
 * CrawlWeb
 * by whiskers75
 */
console.log('Note: This program requires Crawl.');

var tty = require("tty.js");
var s = require('socket.io');
var http = require("http");
var app = tty.createServer({
    shell: 'crawl',
    port: process.env.PORT
});
var fs = require("fs");
var dropbox = require('dropbox.js');
var server = http.createServer(app);
var io = s.listen(server);
var db = new dropbox.Client({
    key: "encoded-key-string|it-is-really-really-long", sandbox: true
});
io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});
app.get('/', function(req, res) {
    fs.readFile(__dirname + '/index.html', 'utf8', function(err,data) {
        if (err) {
            res.writeHead(500);
            res.write('INTERNAL SERVER ERROR');
            res.end();
        }
        else {
            res.writeHead(200);
            res.write(data);
            res.end();
            db.authenticate(function(err, c) {
               if (err) {
                   console.log(err);
                   res.redirect('/');
               }
               else {
                   io.sockets.on('connect', function(socket) {
                       socket.emit('dropbox', {data: c.name});
                   });
               }
               });
               
        }
    });
});
app.get('/crawl', function(req, res) {
    fs.readFile(__dirname + '/node_modules/tty.js/static/index.html', 'utf8', function(err,data) {
        if (err) {
            res.writeHead(500);
            res.write('INTERNAL SERVER ERROR');
            res.end();
        }
        else {
            res.writeHead(200);
            res.write(data);
            res.end();               
        }
    });
});