var express = require('express');
var path = require('path');
var app = express()
var bodyParser = require('body-parser')

app.use(express.static(path.join(__dirname, './static')));
app.use(bodyParser.urlencoded());
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('index');
});

var server = app.listen(8000, function() {
	console.log("listening on port 8000");
});

var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket) {
	console.log('SERVER::WE ARE USING SOCKETS!');
	console.log(socket.id);
	socket.on("javascript", function(data){
		console.log('a vote for javascript');
		socket.broadcast.emit("update_javascript");
	})
	socket.on("swift", function(data){
		console.log("a vote for swift");
		socket.broadcast.emit("update_swift");
	})
});