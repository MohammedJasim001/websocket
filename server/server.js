import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import regiser from './routes/routes.js'
import http from 'http'
import { Server } from 'socket.io'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json({ limit: "50mb" }))
app.use(cors())
mongoose.connect('mongodb://localhost:27017/socket')
        .then(()=>console.log('mongodb connected'))
        .catch((error)=>console.log(error))


app.use('/api/user',regiser)

const server = http.createServer(app)

const io = new Server(server, {
    cors:{
        origin:'http://localhost:5173',
        credentials:true
    }
})

io.on('connection', (socket) => {
    console.log('User connected', socket.id);

    // ✅ Join a group chat room
    socket.on('join_room', (room) => {
        socket.join(room);
        console.log(`User ${socket.id} joined room: ${room}`);
    });

    // ✅ Handle group chat messages
    socket.on('send_group_message', ({ sender, group, content }) => {
        console.log(`Group message from ${sender} in ${group}: ${content}`);
        io.to(group).emit('receive_group_message', { sender, content });
    });

    // ✅ Handle private (one-to-one) chat messages
    socket.on('send_message', (data) => {
        console.log(`Private message from ${data.sender} to ${data.receiver}: ${data.content}`);
        io.emit('receive_message', data);
    });

    // ✅ Leave a room
    socket.on('leave_room', (room) => {
        socket.leave(room);
        console.log(`User ${socket.id} left room: ${room}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
    });
});



server.listen(4000,()=>{
    console.log('server running on port 4000')
})



