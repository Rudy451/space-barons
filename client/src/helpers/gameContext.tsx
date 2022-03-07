import React from "react";

export const GameRoomStatus = React.createContext({
  socket: new Promise(() => {}),
  roomId: '',
  updateRoomId: (roomId: string) => {},
  activeGameStatus: false,
  updateActiveGameStatus: (activeGameStatus: any) => {},
  playerTurn: false,
  updatePlayerTurn: (playerTurn: boolean) => {},
  playerStatus: '',
  updatePlayerStatus: (player: string) => {},
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
  avatar: '',
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
