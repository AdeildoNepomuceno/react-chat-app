let app = require('http').createServer();

let io = module.exports.io = require('socket.io')(app);

const PORT = process.env.PORT || 3231;

let SocketManager = require("./socketManager");

io.on('connection', SocketManager);

app.listen(PORT, () => {
    console.log('connected to ' + PORT);
});