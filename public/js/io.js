const socket = io();
const messageBox = document.querySelector('ul');
const chat = document.querySelector('#chat');
const chatInput = document.querySelector('#chat input');
const login = document.querySelector('#login');
const loginInput = document.querySelector('#login input');
let user = '';

login.onsubmit = () => {
	socket.emit('user', loginInput.value);
	loginInput.value = '';
	return false;
}

socket.on('user', (userInput) => {
	user = userInput;
});

chat.onsubmit = () => {
	socket.emit('chat message', chatInput.value);
	chatInput.value = '';
	return false;
};

socket.on('chat message', (value) => {
	messageBox.innerHTML += `<li><span>${user}:</span> ${value}</li>`;
});
