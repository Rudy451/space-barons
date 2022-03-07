import {useEffect, useState} from 'react';
import { Socket } from 'socket.io-client';
import '../App.css';

import Room from '../components/Room';
import Game from '../components/Game';

const {connectToSocket} = require("../helpers/helperFunctions");
const GameRoomStatus = require('../helpers/gameContext').GameRoomStatus;

const socket = connectToSocket();

function GamePage() {

  const [roomId, updateRoomId] = useState('');
  const [activeGameStatus, updateActiveGameStatus] = useState(false);
  const [playerTurn, updatePlayerTurn] = useState(false);
  const [playerStatus, updatePlayerStatus] = useState('');
  const [cardDeck, updateDeckStatus] = useState([] as any[]);

  useEffect(() => {
    async function setPlayerTurn(){
      socket.then((mySocket:Socket) => {
        mySocket.on('set_player_turn', (startPlayer:boolean, playerStatus:string, cardDeck:any[]) => {
          updatePlayerTurn(startPlayer);
          updatePlayerStatus(playerStatus);
          updateDeckStatus(cardDeck);
        });
      });
    }
    setPlayerTurn();
  });


  return (
      <GameRoomStatus.Provider value={{socket, roomId, updateRoomId, activeGameStatus, updateActiveGameStatus, playerTurn, updatePlayerTurn, playerStatus, updatePlayerStatus, cardDeck}}>
        <head>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Peralta&family=Rowdies:wght@300;400&display=swap');
          </style>
        </head>
        <div className="App App-header">
          {
            activeGameStatus ?
            <div className="Game-background">
              <Game></Game>
            </div> :
            <header>
              <h1>Welcome To $pace Barons</h1>
              <h2>Ready To $tart Your Trek To Trillion$???</h2>
              <Room></Room>
            </header>
          }
        </div>
      </GameRoomStatus.Provider>
  );
}

export default GamePage;
