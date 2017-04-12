const login = document.querySelector('#login');
const btn = document.querySelector('#login button');
const cont = document.querySelector('container');

function fromLoginToChat() {
	cont.classList.remove('hide');
	login.classList.add('hide');
}

btn.addEventListener('click', fromLoginToChat);
