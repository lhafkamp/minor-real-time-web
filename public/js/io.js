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
