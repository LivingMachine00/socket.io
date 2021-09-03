const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server,{ cors: { origin: "*"}})

//impostazioni view-model
app.set('view engine', 'ejs');
app.get('/', (req,res) => res.render('home'));

server.listen(3001,() => 
    {   
        console.log('server running...');
    });


io.on("connection", (socket) => 
    {
        console.log("us=: " , socket.id);   

        socket.on("msg", (data) => 
        {
            console.log(data)
            socket.broadcast.emit("msg", data)
        })
    });