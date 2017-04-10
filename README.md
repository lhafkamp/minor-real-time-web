# minor-real-time-web
Assignments for the course Real-Time Web

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
To start the server on port `9000`  

## Socket.io

To use socket.io you need to do the following:

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

```js
io.on('connection', (socket) => {
	console.log('a user connected');
});
```