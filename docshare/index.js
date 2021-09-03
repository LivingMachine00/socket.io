// init http server, socket.io e porta
const express = require('express')
const app = express()
const server = require('http').createServer(app)

const io = require('socket.io')(server,{ cors: { origin: "*"}})
const port = 3000
const log = console.log


//impostazioni view-model
app.set('view engine', 'ejs');
app.get('/', (req,res) => res.render('home'));

server.listen(port, () => log(`server in ascolto sulla porta: ${port}`))

io.on('connection', (socket) => {
    log('connesso')
    socket.on('msg', (evt) => {
        log(evt)
        socket.broadcast.emit('msg', evt)
    })
})

io.on('disconnect', (evt) => {
    log('client uscito')
})