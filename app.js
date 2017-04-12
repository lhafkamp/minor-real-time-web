const express = require('express');
const app = express();

const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);

// get the public files
app.use(express.static('public'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// on user connect/disconnect
io.on('connection', (socket) => {
	console.log('user connected');
	
	socket.on('disconnect', () => {
		console.log('user disconnected');
	});

	socket.on('user', (user) => {
		io.emit('user', user);
	})

	socket.on('chat message', (message) => {
		io.emit('chat message', message);
	});
});

// render the index page
app.get('/', (req, res) => {
	res.render('index');
});

// 404
app.get('*', (req, res) => {
	res.render('error');
});

// run the app
http.listen(3333, () => {
	console.log('Running on http://localhost:3333');
});
