const io = require('socket.io')();
const moment = require('moment');

const PORT = process.env.PORT || 8000;
moment().format();


io.on('connection', (client) => {
  // this is where you emitt events to the client
  client.on('subscribeToTimer', (interval) => { 
    // when client initializes the 'subscribeToTimer' socket, initiate socket. Client will pass the argument 'interval' 
    console.log('client is subscribing to timer with interval', interval);
    setInterval( () => { 
      // when timer fires (at interval of clients choosing), emit event.
      client.emit('timer', moment().format()); // first argument of emit is name of event, second is the content
    }, interval)
  })
})

// tell socket.io where to start listening for clients
io.listen(PORT);
console.log("Socket listening on port", PORT);


// Do I need to clear the interval for each user?
/*
let interval;
io.on("connection", (client) => {

  console.log("New client connected");
  
  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval( () => subscribeToTimer(client), interval);

  client.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

*/