// require modules
const express = require('express');
const socket = require('socket.io');
const path = require('path');

// express
const app = express();

// get the public files
app.use(express.static('public'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// render the index page
app.get('/', (req, res) => {
	res.render('index');
});

// 404
app.get('*', (req, res) => {
	res.render('error');
});

// run the app
app.listen(3333, () => {
	console.log('Running on http://localhost:3333');
});
