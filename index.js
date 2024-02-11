const express = require("express");
const app = express();
const cors = require("cors");
const { Server } = require("socket.io");
const port = 3000;

app.use(express.json());
app.use(cors());

app.post('/getData', (req, res) => {
    const data = req.body; 
    console.log(data); 
    io.emit("dataIn", data); 
    res.status(200).json({message: "Data received"}); 
});

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const io = new Server(server, { cors: { origin: '*', methods: ['GET', 'POST'] } });

io.on("connection", socket => {
    console.log("connected to socket");
    socket.on("disconnect", () => console.log("disconnected from socket"));
});
