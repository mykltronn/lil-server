const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express() // create http server
  .use( (req, res) => res.sendFile(INDEX) ) // send client index
  .listen(PORT, () => console.log(`Listening on ${ PORT }`)); // listen local host or server port

const wss = new SocketServer({ server }); // instantiate new websocket server with http server as argument to listen for upgrade events

wss.on('connection', (ws) => { // listen for connection
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected')); // listen for disconnection
});


// one benefit sockets is that you can push data to a client without waiting for a client request
setInterval(() => { // push the current time to client every second
  wss.clients.forEach( (client) => {
    client.send(new Date().toTimeString());
  });
}, 1000);