const express = require('express');
const http = require('http');
const {Server} = require("socket.io");
const {useSocketServer} = require("socket-controllers");
const cors = require("cors");
const path = require('path');
import 'reflect-metadata';

const {MainController} = require("./mainController");
const router = require("./routes");

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST']
}

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions
});

useSocketServer(io, {controllers: [MainController]})

const host = 'localhost';
const port = '8080';

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);
app.use('*', (req: any, res: any) => {
  res.send("404... Sorry Not Sorry");
})

server.listen(port, host, () => {
  console.log(`listening on ${host}:${port}...`);
})

module.exports = app;
