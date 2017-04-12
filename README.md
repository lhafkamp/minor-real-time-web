# minor-real-time-web
Assignments for the course Real-Time Web

### Link to the app:
<a href="app.luukhafkamp.nl">app.luukhafkamp.nl</a>

Deployed with:  
  [x] Digital Ocean  
  [x] Phusion Passenger  
  [x] Nginx

## Intro
A simple chat made with socket.io. You can:  
  [x] Log in with a nickname!  
  [x] Chat!  
  [x] See who else is in the room!

## Learning socket.io + problems
The biggest problem I came across was displaying all the users in the chat. I tried to make a client side array but it kept multiplying the users. Because of this I decided that I had to store it server side.

By doing this I also learned how sockets actually worked. Here's what I did:

```js
const userArray = [];
```  
I created an array on the server. Then, I pushed the username retrieved from the slide into the userArray and after that I used emit to send it back to the client.

```js
socket.on('user', (user) => {
		io.emit('user', user);
		userArray.push(user);
		io.emit('thisArrayIsGoingPlaces', userArray);
	});
```  

From the client I use the updated userArray to display the usernames on screen.

```js
socket.on('thisArrayIsGoingPlaces', (userArray) => {
	userBox.innerHTML = '';
	userArray.forEach(newUser => {
		userBox.innerHTML += `<li>${newUser}</li>`;
	});
});
```  

So with this little "exercise" I went:  
=> ss (emitting the user)  
=> client (input value)  
=> ss (updating the array and sending it back)  
=> client (displaying the array content)


## Build
To run the application:
```bash
git clone
```
  
To use the app you need to run the following commands:  
```bash
npm install
```
To install the Node dependencies.
```bash
npm start
```
To start the server on port `3333`  

## Socket.io

To start using socket.io you need the following:

__Client side__

```html
<script>"/socket.io/socket.io.js"</script>
```

```js
const socket = io();
```

__Server side__  
```js
const io = require('socket.io')(http);
```

