import {useEffect, useState} from 'react';
import { Socket } from 'socket.io-client';
import {ethers} from 'ethers';
import '../../App.css';

import HomePage from '../../components/HomePage/HomePage';
import Game from '../../components/Game/Game';
import WaitingRoom from '../../components/WaitingRoom/WaitingRoom';

const {connectToSocket} = require("../../helpers/helperFunctions");
const GameRoomStatus = require('../../helpers/gameContext').GameRoomStatus;

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

  //const [addStars, updateAddStars] = useState(true)
  const [cardIndex, updateCardIndex] = useState(0);
  const [activeGameStatus, updateActiveGameStatus] = useState(false);
  const [playerTurn, updatePlayerTurn] = useState(false);
  const [playerStatus, updatePlayerStatus] = useState('');
  const [cardDeck, updateDeckStatus] = useState([] as any[]);

  useEffect(() => {
    // Determine which player starts the game, each player's move status & card deck access.
    async function setPlayerTurn(){
      socket.then((mySocket:Socket) => {
        mySocket.on('set_player_turn', async (startPlayer:boolean, playerStatus:string, cardDeck:any[]) => {
          updatePlayerTurn(startPlayer);
          updatePlayerStatus(playerStatus);
          updateDeckStatus(cardDeck);
        });
      });
    }

    /*// Small function to add stars to background
    function addStarsToBackground(){
      let starGroups:[string,string,string,string,string,string,string,string] = [
                    "Welcome-large-shooting-star",
                    "Welcome-small-shooting-star",
                    "Welcome-big-white-star",
                    "Welcome-dark-blue-star",
                    "Welcome-medium-blue-star",
                    "Welcome-small-blue-star",
                    "Welcome-really-small-blue-star",
                    "Welcome-really-small-light-blue-star"
                  ]
      let gameBackground:any = document.getElementById("Welcome-background");
      let width:number = 100;
      let height:number = 100;

      for(let starGroupSpot = 0; starGroupSpot < starGroups.length; ++starGroupSpot) {
        for(let starCount = 0; starCount < ((starGroupSpot+1)*4); ++starCount){
          let star = document.createElement("div");
          star.classList.add(starGroups[starGroupSpot])
          let new_height = Math.floor(Math.random() * height);
          let new_width = Math.floor(Math.random() * width);
          star.style.top = `${new_height}vh`;
          star.style.left = `${new_width}vw`;
          gameBackground.appendChild(star);
        }
      }
      updateAddStars(false);
    }*/

    setPlayerTurn();
  });

  return (
      <GameRoomStatus.Provider value={{socket, account, contract, updateContract, activeGameStatus, updateActiveGameStatus, playerTurn, updatePlayerTurn, playerStatus, updatePlayerStatus, cardIndex, updateCardIndex, cardDeck, updateDeckStatus}}>
        <div className="App App-header">
          {<div className="Game-background">
            <Game/>
          </div>}
          {/*
            activeGameStatus ?
              (playerTurn ?
                <div className="Game-background">
                  <Game/>
                </div> :
                <WaitingRoom/>) :
              <HomePage/>
          */}
        </div>
      </GameRoomStatus.Provider>
  );
}

export default GamePage;
