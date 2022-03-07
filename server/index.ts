const express = require('express');
const http = require('http');
const {Server} = require("socket.io");
const {useSocketServer} = require("socket-controllers");
const cors = require("cors");
import 'reflect-metadata';

const {Controller} = require("./controller");
const db = require('./models');

const corsOptions = {
  origin: '*',
  methods: ['GET']
}

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions
});

useSocketServer(io, {controllers: [Controller]});

const host = 'localhost';
const port = '8080';

app.use(cors(corsOptions));
app.use(express.json());

async function bootstrap(){
  await db.sequelize.sync()
  server.listen(port, host, () => {
    console.log(`listening on ${host}:${port}...`);
  })
};

bootstrap();
