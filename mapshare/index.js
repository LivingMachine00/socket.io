const express = require('express')
const app = express()
const server = require("http").Server(app);
//const io = require("socket.io")(Server);
const io = require('socket.io')(server,{ cors: { origin: "*"}})


const port = 3001;

app.set('view engine', 'ejs');
app.get('/', (req,res) => res.render('home'));

server.listen(port, () => {
    console.log("In ascolto su ", port, "...");
});


const markers = [];

//trasmetto tutti markers al nuovo connesso
io.on("connection", (socket) => {
    for (let i = 0; i < markers.length; i++) {
        socket.emit("markers",markers[i]);
    }
    //se sul socket appare un nuovo evento "marker" => giro a tutti il nuovo marker
    socket.on("marker", data => {
        markers.push(data);
        io.emit("marker", data);
    });
})