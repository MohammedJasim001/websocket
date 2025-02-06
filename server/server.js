import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import regiser from './routes/routes.js'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
app.use(express.json())
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

io.on('connection',(socket)=>{
    console.log('user connected',socket.id)

    socket.on('send_message',(data)=>{
        console.log(data)
        // socket.broadcast.emit('receive_message',data)
        io.emit('receive_message',data)
    })

    socket.on("disconnect",()=>{
        console.log('user disconnected')
    })
})


server.listen(4000,()=>{
    console.log('server running on port 4000')
})



