(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const io = require('./io');
const toggles = require('./toggles');

},{"./io":2,"./toggles":3}],2:[function(require,module,exports){
const messageBox = document.querySelector('#messages');
const userBox = document.querySelector('#users');
const chat = document.querySelector('#chat');
const chatInput = document.querySelector('#chat input');
const login = document.querySelector('#login');
const loginInput = document.querySelector('#login input');

const socket = io();
let user = '';

login.onsubmit = () => {
	socket.emit('user', loginInput.value);
	loginInput.value = '';
	return false;
}

socket.on('user', (userInput) => {
	user = userInput;
});

socket.on('thisArrayIsGoingPlaces', (userArray) => {
	userBox.innerHTML = '';
	userArray.forEach(newUser => {
		userBox.innerHTML += `<li>${newUser}</li>`;
	});
});

socket.on('delete', (userArray) => {
	const removeUser = userArray.indexOf(user);
	userArray.splice(removeUser, 1);

	userBox.innerHTML = '';
	userArray.forEach(oldUser => {
		userBox.innerHTML += `<li>${oldUser}</li>`;
	});
});

chat.onsubmit = () => {
	socket.emit('chat message', chatInput.value);
	chatInput.value = '';
	return false;
};

socket.on('chat message', (value) => {
	messageBox.innerHTML += `<li><span>${user}:</span> ${value}</li>`;
});

},{}],3:[function(require,module,exports){
const login = document.querySelector('#login');
const btn = document.querySelector('#login button');
const cont = document.querySelector('container');

function fromLoginToChat() {
	cont.classList.remove('hide');
	login.classList.add('hide');
}

btn.addEventListener('click', fromLoginToChat);

},{}]},{},[1]);
