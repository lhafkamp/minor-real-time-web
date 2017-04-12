const messageBox = document.querySelector('#messages');
const userBox = document.querySelector('#users');
const chat = document.querySelector('#chat');
const chatInput = document.querySelector('#chat input');
const login = document.querySelector('#login');
const loginInput = document.querySelector('#login input');

const socket = io();
let user = '';

// receive the input value
login.onsubmit = () => {
	socket.emit('user', loginInput.value);
	loginInput.value = '';
	return false;
}

// store the input value
socket.on('user', (userInput) => {
	user = userInput;
});

// display the array that was stored in the server
socket.on('thisArrayIsGoingPlaces', (userArray) => {
	userBox.innerHTML = '';
	userArray.forEach(newUser => {
		userBox.innerHTML += `<li>${newUser}</li>`;
	});
});

// on disconnect, remove the user from the array and refresh the user list
socket.on('delete', (userArray) => {
	const removeUser = userArray.indexOf(user);
	userArray.splice(removeUser, 1);

	userBox.innerHTML = '';
	userArray.forEach(oldUser => {
		userBox.innerHTML += `<li>${oldUser}</li>`;
	});
});

// receive the input value
chat.onsubmit = () => {
	socket.emit('chat message', chatInput.value);
	chatInput.value = '';
	return false;
};

// show the user + input value
socket.on('chat message', (value) => {
	messageBox.innerHTML += `<li><span>${user}:</span> ${value}</li>`;
});
