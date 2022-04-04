### Space Barons
![SpaceBaronsRegister](https://github.com/Rudy451/space-barons/blob/main/gamepics/SpaceBaronsRegister.PNG)
Space Barons is an online multi-player card game and dapp designed to teach users about investing while introducing them to blockchain technology.

![SpaceBaronsPayment](https://github.com/Rudy451/space-barons/blob/main/gamepics/SpaceBaronsPayment.PNG)
Each game is played between a maximum of two participants who must have a metamask (https://metamask.io/) crypto wallet. Each player contributes one ether - rinkeby testnet either instead of ethereum mainnet - from their metamask account and the winner receives all funds linked to the current game.

![SpaceBaronsGameplay](https://github.com/Rudy451/space-barons/blob/main/gamepics/SpaceBaronsGameplay.PNG)

The actual gameplay is fairly similar to Monopoly or Settlers of Catan. Each player owns a portfolio comprised of liquid currency and stock representing ownership in a particular planet. (A complete breakdown of each player's portfolio can be accesssed by clicking on their avatars). The two competitors will then alternate pulling cards from a deck; cards can either change a particular planet's stock price or give the mover an option to trade (buy or sell) the specified stock. (The player can also elect to pass).

Player strategy will mostly depend on the trading cards mentioned above. Trading card strategy essentially involves counting cards and calculating the odds that buying or selling during a particular turn will materially change a given player's overall portfolio.

### Getting Started
To install the required dependencies run `npm install`.
- Client Path: space-barons/client.
- Server Path: space-barons/server.

Starting the App: Run `npm start` in both the client & server folders to activate the frontend and backend respectively.

Player Requirements: Easy-to-follow instructions are included in all listed sites and the entire process is free.
- Create at least two metamask accounts (https://metamask.io/).
- Add funds via the rinkeby ether faucet (https://faucet.rinkeby.io/).
- Add the metamask browser extension for at least two different browsers. Options include Chrome, Firefox, Brave, Edge. (You can also download the mobile app for Android & iOS).
- Run the game in two different browsers. (I personally tested using Chrome and Firefox).

### Tech Stack
- Frontend: React, MetaMask.
- Backend: Socket.io, Express, Sequelize, PostgreSQL.
- Other: Remix IDE (Build, Compile, Test, Deploy Smart Contracts).

### Contributors
Dane Johnson (Rudy 451): https://github.com/Rudy451.
