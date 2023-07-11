const port = process.env.PORT || 3000;
const server = require("http").createServer(require("./app"));
const socketio = require('socket.io');

const io = socketio(server, 
    {
      pingInterval: 5000,
      serveClient: true,
      cors: {
        origin: "*",
        credentials: false
      }
  });
server.listen(port);

console.log("FingerPay API and Sockets Server started at port ", port);

// connect socket app
// require('./socket/socket-app')(io);

