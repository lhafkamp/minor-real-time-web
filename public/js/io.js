const socket = io();
const messageBox = document.querySelector('ul');
const form = document.querySelector('form');
const input = document.querySelector('input');
const btn = document.querySelector('button');

form.onsubmit = () => {
	socket.emit('chat message', input.value);
	input.value = '';
	return false;
};

socket.on('chat message', (value) => {
	messageBox.innerHTML += `<li>${value}</li>`;
});
