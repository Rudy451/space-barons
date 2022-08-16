import {useEffect, useState} from 'react';
import { Socket } from 'socket.io-client';
import {ethers} from 'ethers';
import '../App.css';

import Room from '../components/Room';
import Game from '../components/Game';

const {connectToSocket} = require("../helpers/helperFunctions");
const GameRoomStatus = require('../helpers/gameContext').GameRoomStatus;

const socket = connectToSocket();

function GamePage() {
  const [account, updateAccount] = useState((window as any).ethereum)
  const [contract, updateContract] = useState(
    new ethers.Contract(
    '0xc337fa4993103B43D9A6FB0ca3d187857baD6145',
    [
      {
        "inputs": [],
        "name": "clearActiveGame",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "clearBuggedGame",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "roomId",
            "type": "string"
          }
        ],
        "name": "participantDepositFunds",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [],
        "stateMutability": "payable",
        "type": "constructor"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "roomId",
            "type": "string"
          }
        ],
        "name": "winnerWithdrawFunds",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "stateMutability": "payable",
        "type": "receive"
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
        "type": "function"
      }
    ],
    new ethers.providers.Web3Provider((window as any).ethereum).getSigner())
  );
  const [cardIndex, updateCardIndex] = useState(0);
  const [activeGameStatus, updateActiveGameStatus] = useState(false);
  const [playerTurn, updatePlayerTurn] = useState(false);
  const [playerStatus, updatePlayerStatus] = useState('');
  const [cardDeck, updateDeckStatus] = useState([] as any[]);

  useEffect(() => {
    async function setPlayerTurn(){
      socket.then((mySocket:Socket) => {
        mySocket.on('set_player_turn', async (startPlayer:boolean, playerStatus:string, myRoom:any, cardDeck:any[]) => {
          const options = {value: ethers.utils.parseEther('1.0')}
          await contract.participantDepositFunds(myRoom as any, options);
          updatePlayerTurn(startPlayer);
          updatePlayerStatus(playerStatus);
          updateDeckStatus(cardDeck);
        });
      });
    }
    setPlayerTurn();
  });


  return (
      <GameRoomStatus.Provider value={{socket, account, contract, updateContract, activeGameStatus, updateActiveGameStatus, playerTurn, updatePlayerTurn, playerStatus, updatePlayerStatus, cardIndex, updateCardIndex, cardDeck, updateDeckStatus}}>
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
