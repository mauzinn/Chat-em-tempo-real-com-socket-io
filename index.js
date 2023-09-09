const Express = require('express')
const { createServer } = require('node:http');
const { join } = require('node:path')
const app = Express()
const { Server } = require('socket.io')
let usuarios = 0


const server = createServer(app)
const io = new Server(server)

app.get('/', (req, res) => {
    res.sendFile(join(__dirname + '/pagina/index.html'))
})

io.on('connection', (socket) => {
    usuarios += 1
    io.emit('users counter', usuarios)

    socket.on('disconnect', () => {
        usuarios -= 1
        io.emit('users counter', usuarios)
    })
})

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg)
    })
})

io.on('connection', (socket) => {
    socket.on('img message', (imgLink) => {
        io.emit('img message', imgLink)
    })
})


server.listen(3000, () => {
    console.log('Server rodando na porta 3000')
})