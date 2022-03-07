import { useState, useEffect, useContext } from "react";
import ReactCardFlip from 'react-card-flip';

import PlanetList from "./PlanetList";
import Player from './Player';

const {GameRoomStatus, PlanetData, PlayerData} = require('../helpers/gameContext');

function Game() {

  const [planetsList, updatePlanetsList] = useState([
    {'name': 'Mercury', 'photo': 'https://i.postimg.cc/rySqCV5n/mercury.png', 'shares': 2000, 'price': 250, 'marketValue': 500000, 'changeStatus': 'flat', 'changeAmount': 0},
    {'name': 'Venus', 'photo': 'https://i.postimg.cc/BQpskmY2/venus.png', 'shares': 2000, 'price': 250, 'marketValue': 500000, 'changeStatus': 'flat', 'changeAmount': 0},
    {'name': 'Earth', 'photo': 'https://i.postimg.cc/d0kY7wq9/earth.png', 'shares': 2000, 'price': 250, 'marketValue': 500000, 'changeStatus': 'flat', 'changeAmount': 0},
    {'name': 'Mars', 'photo': 'https://i.postimg.cc/63Cx0c42/mars.png', 'shares': 2000, 'price': 250, 'marketValue': 500000, 'changeStatus': 'flat', 'changeAmount': 0},
    {'name': 'Jupiter', 'photo': 'https://i.postimg.cc/Dyv3rqv0/jupiter.png', 'shares': 2000, 'price': 250, 'marketValue': 500000, 'changeStatus': 'flat', 'changeAmount': 0},
    {'name': 'Saturn', 'photo': 'https://i.postimg.cc/xdbwf5Rx/saturn.png', 'shares': 2000, 'price': 250, 'marketValue': 500000, 'changeStatus': 'flat', 'changeAmount': 0},
    {'name': 'Uranus', 'photo': 'https://i.postimg.cc/QtQv5Mvc/uranus.png', 'shares': 2000, 'price': 250, 'marketValue': 500000, 'changeStatus': 'flat', 'changeAmount': 0},
    {'name': 'Neptune', 'photo': 'https://i.postimg.cc/0j9FCsqF/neptune.png', 'shares': 2000, 'price': 250, 'marketValue': 500000, 'changeStatus': 'flat', 'changeAmount': 0}
  ]);

  const [player1PortfolioList, updatePlayer1PortfolioList] = useState([
    {'name': 'Currency', 'shares': 20000, 'price': 1, 'marketValue': 20000},
    {'name': 'Mercury', 'shares': 40, 'price': 250, 'marketValue': 10000},
    {'name': 'Venus', 'shares': 40, 'price': 250, 'marketValue': 10000},
    {'name': 'Earth', 'shares': 40, 'price': 250, 'marketValue': 10000},
    {'name': 'Mars', 'shares': 40, 'price': 250, 'marketValue': 10000},
    {'name': 'Jupiter', 'shares': 40, 'price': 250, 'marketValue': 10000},
    {'name': 'Saturn', 'shares': 40, 'price': 250, 'marketValue': 10000},
    {'name': 'Uranus', 'shares': 40, 'price': 250, 'marketValue': 10000},
    {'name': 'Neptune', 'shares': 40, 'price': 250, 'marketValue': 10000}
  ]);

  const [player2PortfolioList, updatePlayer2PortfolioList] = useState([
    {'name': 'Currency', 'shares': 20000, 'price': 1, 'marketValue': 20000},
    {'name': 'Mercury', 'shares': 40, 'price': 250, 'marketValue': 10000},
    {'name': 'Venus', 'shares': 40, 'price': 250, 'marketValue': 10000},
    {'name': 'Earth', 'shares': 40, 'price': 250, 'marketValue': 10000},
    {'name': 'Mars', 'shares': 40, 'price': 250, 'marketValue': 10000},
    {'name': 'Jupiter', 'shares': 40, 'price': 250, 'marketValue': 10000},
    {'name': 'Saturn', 'shares': 40, 'price': 250, 'marketValue': 10000},
    {'name': 'Uranus', 'shares': 40, 'price': 250, 'marketValue': 10000},
    {'name': 'Neptune', 'shares': 40, 'price': 250, 'marketValue': 10000}
  ]);

  const [flippedStatus, updateFlippedStatus] = useState(false);
  const {socket, roomId, playerTurn, updatePlayerTurn, playerStatus} = useContext(GameRoomStatus)

  async function updateMyGameData(planetName: string, planetShares: number, planetPrice: number){
    socket.then((mySocket:any) =>
      {
        // My Player Updates;
        let myPortfolio;
        for(let planet of planetsList){
          if(planet.name === planetName){
            planet.shares = planetShares;
            planet.price = planetPrice;
            const newMarketValue = planet.price * planet.shares;
            planet.changeAmount = newMarketValue - planet.marketValue;
            planet.marketValue = newMarketValue;
            planet.changeStatus = planet.changeAmount === 0 ? "flat" : planet.changeAmount > 0 ? "up" : "down";
            break;
          }
        }
        planetsList.sort((planetOne, planetTwo) => planetTwo.marketValue-planetOne.marketValue)
        updatePlanetsList(planetsList);
        updatePlayerTurn(false);
        mySocket.emit('update_game', [roomId, player1PortfolioList, planetsList]);
        flipCard();
      }
    );
  }

  function flipCard() {
    updateFlippedStatus(!flippedStatus);
  }

  useEffect(() => {
    async function updateTheirGameData(){
      socket.then((mySocket:any) => mySocket.on('new_game_update', (message: any) => {
        updatePlayer1PortfolioList(message[0]);
        updatePlanetsList(message[1]);
        updatePlayerTurn(true);
      }));
    }
    updateTheirGameData();
  }, [])

  return (
    <div className="Live-game__structure">
      <div className="Room-number">{roomId}</div>
      <div className="Scoreboard">
        <PlayerData.Provider value={{playerPortfolioList: player1PortfolioList, updatePlayerPortfolioList: updatePlayer1PortfolioList}}>
          <Player player={playerStatus === '' ? 'TBD' : playerStatus === 'player1' ? 'Winner (Me)' : 'Loser (Them)'} avatar={playerStatus === '' ? playerStatus : 'https://i.postimg.cc/rwJPMW9B/space-player1.png'} turn={(playerStatus === 'player1' && playerTurn) || (playerStatus === 'player2' && !playerTurn)}/>
        </PlayerData.Provider>
        <PlayerData.Provider value={{playerPortfolioList: player2PortfolioList, updatePlayerPortfolioList: updatePlayer2PortfolioList}}>
          <Player player={playerStatus === '' ? 'TBD' : playerStatus === 'player2' ? 'Winner (Me)' : 'Loser (Them)'} avatar={playerStatus === '' ? playerStatus : 'https://i.postimg.cc/13JJLSmP/space-player2.png'} turn={(playerStatus === 'player2' && playerTurn) || (playerStatus === 'player1' && !playerTurn)}/>
        </PlayerData.Provider>
      </div>
      <div className="Stock-ticker">
          <div className="Stock-table__taj-mahal-main">
            <div className="Stock-table__taj-rightpillar">
              <div className="Stock-table__taj-pillar-tip"/>
              <div className="Stock-table__taj-pillar-dome"/>
              <div className="Stock-table__taj-rightpillar-base"/>
            </div>
            <div className="Stock-table__taj-rightpillar">
              <div className="Stock-table__taj-pillar-tip"/>
              <div className="Stock-table__taj-pillar-dome"/>
              <div className="Stock-table__taj-short-rightpillar-base"/>
            </div>
            <div className="Stock-table__taj-tower"/>
            <div className="Stock-table__taj-mahal">
              <div className="Stock-table__taj-mahal-tip"/>
              <div className="Stock-table__taj-mahal-tip-thin-oval"/>
              <div className="Stock-table__taj-mahal-tip-oval"/>
              <div className="Stock-table__taj-mahal-tip-circle"/>
              <div className="Stock-table__taj-mahal-dome-top"/>
              <div className="Stock-table__taj-mahal-dome">
                <div className="Card">
                  <ReactCardFlip isFlipped={flippedStatus} flipSpeedBackToFront={1} flipSpeedFrontToBack={1} flipDirection="horizontal">
                    <button className="Card-button" onClick={() => flipCard()} disabled={!playerTurn}>
                      <div className="Card Card-back">
                        <div className="Card-back-text">$pace</div>
                        <img className="Card-back-image" src="https://i.postimg.cc/LsC4YHZy/president.png"/>
                        <div className="Card-back-text">Baron$</div>
                      </div>
                    </button>
                    <button className="Card-button" onClick={async () => await updateMyGameData("Mars", 300, 2)}>
                      <div className="Card Card-front"></div>
                    </button>
                  </ReactCardFlip>
                </div>
              </div>
              <div className="Stock-table__taj-mahal-base">
                <img className="Trading-floor" src="https://i.postimg.cc/151bt6XW/gameboard2.png"/>
              </div>
            </div>
            <div className="Stock-table__taj-tower"/>
            <div className="Stock-table__taj-leftpillar">
              <div className="Stock-table__taj-pillar-tip"/>
              <div className="Stock-table__taj-pillar-dome"/>
              <div className="Stock-table__taj-short-leftpillar-base"/>
            </div>
            <div className="Stock-table__taj-leftpillar">
              <div className="Stock-table__taj-pillar-tip"/>
              <div className="Stock-table__taj-pillar-dome"/>
              <div className="Stock-table__taj-leftpillar-base"/>
            </div>
          </div>
        <div className="Stock-table">
          <PlanetData.Provider value={{planetsList, updatePlanetsList}}>
            <PlanetList></PlanetList>
          </PlanetData.Provider>
        </div>
      </div>
    </div>
  )
}

export default Game;
