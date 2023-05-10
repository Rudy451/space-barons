import React from "react";
import {ethers} from "ethers";

export const GameRoomStatus = React.createContext({
  socket: new Promise(() => {}),
  account: (window as any).ethereum,
  contract: new ethers.Contract(
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
    ]
  , new ethers.providers.Web3Provider((window as any).ethereum).getSigner()),
  updateContract: (contract: any) => {},
  activeGameStatus: false,
  updateActiveGameStatus: (activeGameStatus: any) => {},
  playerTurn: false,
  updatePlayerTurn: (playerTurn: boolean) => {},
  playerStatus: '',
  updatePlayerStatus: (player: string) => {},
  cardIndex: 0,
  updateCardIndex: (cardIndex: number) => {},
  cardDeck: [] as any[]
});

export const PlanetData = React.createContext({
  planetsList: [
    {'name': '', 'photo': '', 'shares': 0, 'price': 0, 'marketValue': 0, 'changeStatus': 'flat', 'changeAmount': 0},
    {'name': '', 'photo': '', 'shares': 0, 'price': 0, 'marketValue': 0, 'changeStatus': 'flat', 'changeAmount': 0},
    {'name': '', 'photo': '', 'shares': 0, 'price': 0, 'marketValue': 0, 'changeStatus': 'flat', 'changeAmount': 0},
    {'name': '', 'photo': '', 'shares': 0, 'price': 0, 'marketValue': 0, 'changeStatus': 'flat', 'changeAmount': 0},
    {'name': '', 'photo': '', 'shares': 0, 'price': 0, 'marketValue': 0, 'changeStatus': 'flat', 'changeAmount': 0},
    {'name': '', 'photo': '', 'shares': 0, 'price': 0, 'marketValue': 0, 'changeStatus': 'flat', 'changeAmount': 0},
    {'name': '', 'photo': '', 'shares': 0, 'price': 0, 'marketValue': 0, 'changeStatus': 'flat', 'changeAmount': 0},
    {'name': '', 'photo': '', 'shares': 0, 'price': 0, 'marketValue': 0, 'changeStatus': 'flat', 'changeAmount': 0}
  ],
  updatePlanetsList: (arr: any) => {}
  });

export const PlayerData = React.createContext({
  playerPortfolioList: [
    {'name': '', 'shares': 0, 'price': 0, 'marketValue': 0},
    {'name': '', 'shares': 0, 'price': 0, 'marketValue': 0},
    {'name': '', 'shares': 0, 'price': 0, 'marketValue': 0},
    {'name': '', 'shares': 0, 'price': 0, 'marketValue': 0},
    {'name': '', 'shares': 0, 'price': 0, 'marketValue': 0},
    {'name': '', 'shares': 0, 'price': 0, 'marketValue': 0},
    {'name': '', 'shares': 0, 'price': 0, 'marketValue': 0},
    {'name': '', 'shares': 0, 'price': 0, 'marketValue': 0},
    {'name': '', 'shares': 0, 'price': 0, 'marketValue': 0}
  ],
  updatePlayerPortfolioList: (arr: any) => {}
});
