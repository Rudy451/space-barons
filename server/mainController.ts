import { Socket, Server } from "socket.io";
const {
  SocketController,
  OnConnect,
  OnDisconnect,
  OnMessage,
  MessageBody,
  ConnectedSocket,
  SocketIO
} = require("socket-controllers");
const {v4: uuidv4} = require("uuid");

@SocketController()
export class MainController {
  @OnConnect()
  connection(@ConnectedSocket() socket: Socket){
    console.log('client connected', socket.id);
  }

  @OnDisconnect()
  disconnect(@ConnectedSocket() socket: Socket){
    console.log('client disconnected', socket.id);
  }

  @OnMessage("start_new_game")
  newGame(@SocketIO() io: Server, @ConnectedSocket() socket: Socket){
    console.log("New user joining room", socket.id);
    const playerGamesList = Array.from(socket.rooms.values()).filter(player => player != socket.id);
    const roomsList = Array.from(io.sockets.adapter.rooms).filter(rm =>rm[0].includes("Room") && rm[1].size === 1);
    console.log(roomsList)
    if(playerGamesList.length === 0){
      if(roomsList.length === 0){
        socket.join(`Room ${uuidv4()}`);
      } else {
        socket.join(roomsList[0][0]);
      }
      socket.emit("started_new_game");
    } else {
      socket.emit("failed_to_start_game");
    }
  }

  @OnMessage("join_existing_game")
  rejoinGame(@SocketIO() io: Server, @ConnectedSocket() socket: Socket, @MessageBody() message: string){
    console.log("User trying to rejoin room", socket.id);
    const playerGamesList = Array.from(socket.rooms.values()).filter(player => player != socket.id);
    const roomsList = Array.from(io.sockets.adapter.rooms.keys()).filter((rm:any) =>rm.includes(message));
    console.log(roomsList);
    if(playerGamesList.length === 0 && roomsList.length === 1){
        socket.join(roomsList[0]);
      socket.emit("joined_existing_game");
    } else {
      socket.emit("failed_to_join_existing_game");
    }
  }
}
