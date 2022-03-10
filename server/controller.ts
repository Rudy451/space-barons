import { Socket, Server } from 'socket.io';
import Web3 from 'web3';
import {AbiItem} from 'web3-utils';

const {
  SocketController,
  OnConnect,
  OnDisconnect,
  OnMessage,
  MessageBody,
  ConnectedSocket,
  SocketIO
} = require('socket-controllers');

const {v4: uuidv4} = require("uuid");
const dotenv = require('dotenv').config();
const db = require('./models');

@SocketController()
export class Controller {
  @OnConnect()
  connection(@ConnectedSocket() socket: Socket){
    console.log('client connected', socket.id);
  }

  @OnDisconnect()
  disconnect(@ConnectedSocket() socket: Socket){
    console.log('client disconnected', socket.id);
  }
  /*
  @OnMessage('start_new_game')
  newGame(@SocketIO() io: Server, @ConnectedSocket() socket: Socket){
    console.log('New user joining room', socket.id);
    async function getData(){
      const playerGamesList = Array.from(socket.rooms.values()).filter(player => player != socket.id);
      const roomsList = Array.from(io.sockets.adapter.rooms).filter(rm =>rm[0].includes('Room') && rm[1].size === 1);
      if(playerGamesList.length === 0){
        const myRoom = roomsList.length === 0 ? `Room ${uuidv4()}` : roomsList[0][0];
        socket.join(myRoom);
        socket.emit('started_new_game', myRoom);
        if(roomsList.length === 1){
          const cardDeck = await db.cards.findAll();
          socket.emit('get_card_deck', cardDeck)
        }
      } else {
        socket.emit('failed_start_game');
      }
    }
    getData();
  }


  @OnMessage('make_payment')
  makePayment(@SocketIO() io: Server, @ConnectedSocket() socket: Socket){
    async function payData(){
      /*const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
      let contract = new web3.eth.Contract([
        {
          "inputs": [],
          "stateMutability": "payable",
          "type": "constructor",
          "payable": true
        },
        {
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "internalType": "address payable",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "stateMutability": "payable",
          "type": "receive",
          "payable": true
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "player",
              "type": "string"
            },
            {
              "internalType": "address payable",
              "name": "playerAddress",
              "type": "address"
            }
          ],
          "name": "participantDepositFunds",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function",
          "payable": true
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "player",
              "type": "string"
            }
          ],
          "name": "winnerWithdrawFunds",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function",
          "payable": true
        }
      ] as AbiItem[], '0x7A5F239598A2739f07bcA4C5F8B1A266962A8C21');
      await contract.methods.participantDepositFunds(socket.id, '0xB1Ee4be5ddD602E944E8959c1e76C5088e93091a').send({from: '0xB1Ee4be5ddD602E944E8959c1e76C5088e93091a', value: 30});
      //const owner = await contract.methods.owner.call();
      console.log(contract.methods)
      const roomsList = Array.from(io.sockets.adapter.rooms);
      const targetPlayer = Array.from(roomsList[0][1])[0];
      const startPlayer = Math.floor(Math.random() * 2) === 1 ? true : false;
      const playerClass = Math.floor(Math.random() * 2) === 1 ? 'player1' : 'player2';
      const cardDeck = await db.cards.findAll();
      socket.emit('set_player_turn', startPlayer, playerClass, cardDeck);
      socket.to(targetPlayer).emit('set_player_turn', !startPlayer, playerClass === 'player1' ? 'player2' : 'player1', cardDeck);
      socket.emit('payment_complete', 'player1');
    }
    payData();
  }*/

  @OnMessage('start_new_game')
  newGame(@SocketIO() io: Server, @ConnectedSocket() socket: Socket){
    console.log('New user joining room', socket.id);
    async function getData(){
      const playerGamesList = Array.from(socket.rooms.values()).filter(player => player != socket.id);
      const roomsList = Array.from(io.sockets.adapter.rooms).filter(rm =>rm[0].includes('Room') && rm[1].size === 1);
      if(playerGamesList.length === 0){
        const myRoom = roomsList.length === 0 ? `Room ${uuidv4()}` : roomsList[0][0];
        socket.join(myRoom);
        socket.emit('started_new_game', myRoom);
        if(roomsList.length === 1){
          const targetPlayer = Array.from(roomsList[0][1])[0];
          const startPlayer = Math.floor(Math.random() * 2) === 1 ? true : false;
          const playerClass = Math.floor(Math.random() * 2) === 1 ? 'player1' : 'player2';
          const cardDeck = await db.cards.findAll();
          socket.emit('set_player_turn', startPlayer, playerClass, cardDeck);
          socket.to(targetPlayer).emit('set_player_turn', !startPlayer, playerClass === 'player1' ? 'player2' : 'player1', cardDeck);
        }
      } else {
        socket.emit('failed_start_game');
      }
    }
    getData();
  }

  @OnMessage('update_game')
  updateGame(@SocketIO() io: Server, @ConnectedSocket() socket: Socket, @MessageBody() message: any){
    const targetRoom = Array.from(io.sockets.adapter.rooms).filter((rm:any) => rm.includes(message[0]));
    if(targetRoom.length === 1){
      const targetPlayer = Array.from(targetRoom[0][1]).filter(sockId => sockId != socket.id);
      socket.to(targetPlayer).emit('new_game_update', message.slice(1));
    } else {
      socket.emit('failed_game_update');
    }
  }

  @OnMessage('game_over')
  endGame(@SocketIO() io: Server, @ConnectedSocket() socket: Socket, @MessageBody() message:any){
    // gameover call smart contact update accts
    const targetRoom = Array.from(io.sockets.adapter.rooms).filter((rm:any) => rm.includes(message[0]));
    const targetPlayer = Array.from(targetRoom[0][1]).filter(sockId => sockId != socket.id);
    socket.to(targetPlayer).emit('game_is_over', message);
  }
}
