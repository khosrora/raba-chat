const express = require('express');
const { Server } = require('socket.io');


const app = express();
const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
    console.log(`node js app listening on port ${port}`);
})

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

let onlineUsers = [];

io.on('connection', (socket) => {
    socket.on("join", userId => {
        if (!socket.rooms.has(userId)) {
            socket.join(userId)
            if (!onlineUsers.includes(userId)) {
                onlineUsers.push(userId)
            }
        }
        // io.to("666028364fded99b58bc99d7").emit("tsting", "hello messi")

        onlineUsers.forEach((user) => {
            io.to(user).emit("online_users_count", onlineUsers)
        })
    })

    socket.on("logout", (userId) => {
        socket.leave(userId);
        onlineUsers = onlineUsers.filter(id => userId !== id)
        onlineUsers.forEach((user) => {
            io.to(user).emit("online_users_count", onlineUsers)
        })
    })


})

app.get('/', (req, res) => {
    res.send('hello server')
})