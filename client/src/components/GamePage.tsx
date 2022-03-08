import {useEffect, useState} from 'react';
import { Socket } from 'socket.io-client';
import '../App.css';

import Room from '../components/Room';
import Game from '../components/Game';

const {connectToSocket} = require("../helpers/helperFunctions");
const GameRoomStatus = require('../helpers/gameContext').GameRoomStatus;

const socket = connectToSocket();

function GamePage() {

  const [cardIndex, updateCardIndex] = useState(0);
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
      <GameRoomStatus.Provider value={{socket, roomId, updateRoomId, activeGameStatus, updateActiveGameStatus, playerTurn, updatePlayerTurn, playerStatus, updatePlayerStatus, cardIndex, updateCardIndex, cardDeck}}>
        <div className="App App-header">
          {
            activeGameStatus ?
            <div className="Game-background">
              <Game></Game>
            </div> :
            <header className='Welcome-background'>
              <h1 className='Welcome-header-font'>Welcome To $pace Barons</h1>
              <img className="Mr-Sun" src="https://i.postimg.cc/LsC4YHZy/president.png"/>
              <div className="Welcome-subheading">
                <h2>Ready To $tart Your Trek To Trillion$???</h2>
                <h3>First Player To Reach $1 Trillion in Total Assets Wins!</h3>
              </div>
              <Room></Room>
            </header>
          }
        </div>
      </GameRoomStatus.Provider>
  );
}

export default GamePage;
