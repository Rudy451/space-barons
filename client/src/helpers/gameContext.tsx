import React from "react";
import {ethers} from "ethers";

export const GameRoomStatus = React.createContext({
  socket: new Promise(() => {}),
  account: (window as any).ethereum,
  contract: new ethers.Contract(
    '0x53aA82E6d7F45bE639f59c825264dc64FeE2BADC',
    [
      {
        "inputs": [],
        "stateMutability": "payable",
        "type": "constructor"
      },
      {
        "inputs": [],
        "name": "clearPlayer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
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
