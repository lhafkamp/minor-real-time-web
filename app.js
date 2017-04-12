const express = require('express');
const app = express();

const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);

const userArray = [];

// get the public files
app.use(express.static('public'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// on connection
io.on('connection', (socket) => {
	// get the user value and push it into the array
	socket.on('user', (user) => {
		io.emit('user', user);
		userArray.push(user);
		// send the array to the client
		io.emit('thisArrayIsGoingPlaces', userArray);
	});

	socket.on('chat message', (message) => {
		io.emit('chat message', message);
	});

	socket.on('disconnect', () => {
		io.emit('delete', userArray);
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
