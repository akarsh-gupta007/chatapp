const express = require('express')
const app = express()
const dotenv=require("dotenv")
const http = require('http').createServer(app)
dotenv.config();
const port = process.env.PORT || 3002

http.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})


