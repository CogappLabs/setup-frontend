const io = require('socket.io-client');
const socketIo = require("socket.io");
const express = require("express");
const path = require("path");
const http = require("http");
const socket = io.connect('wss://launch-frontend.fly.dev');
const app = express();
const port = process.env.PORT || 4003;
const {spawn} = require('child_process');

app.use( express.static(__dirname + '/frontend/setup-frontend/build/'));
app.get('/*', (req, res) => res.sendFile(path.resolve(__dirname + '/frontend/setup-frontend/build', 'index.html')));

const server = http.createServer(app);

const ioLocal = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

ioLocal.on('connection', (socketLocal) => {

    socketLocal.on('joinRoomLocal', (room) => {
        console.log(room);
        socket.emit('joinRoom', room);
    });

    socketLocal.on('setScreenLocal', (screen) => {
        console.log(screen);
        socket.emit('setScreen', screen)
    });

});


socket.on('connect', () => {
    console.log('Successfully connected!');
});

socket.io.on("error", (error) => {
    console.log(error);
});

socket.on('launchScreens', (data) => {
    console.log('launchScreens');
    console.log(data);
    const time = data.time.toString();
    spawn('python3', ['launch_video.py', '-t', time])
})


socket.on('launchScreen', (data) => {
    console.log('launchScreen');
    console.log(data);
})

server.listen(port, () => console.log(`Listening on port ${port}`));
