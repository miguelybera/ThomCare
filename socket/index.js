const { Socket } = require('socket.io')

const io = require('socket.io')(8900, {
    cors: {
        origin: 'http://localhost:3000'
    }
})

let users = []

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
    console.log('a user connected', socket.id)

    //take userID and socketId from user
    socket.on('addUser', (userId) => {
        addUser(userId, socket.id)
        io.emit('getUsers', users)
    })

    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        try {
            io.to(user.socketId).emit("getMessage", {
                senderId,
                text
                });
        } catch (err) {
            console.log('user is offline')
        }
    });

    //on disconnection
    socket.on('disconnect', ()=>{
        console.log('a user disconnected', socket.id)
        removeUser(socket.id)
        io.emit("getUsers", users);
    })
}) 