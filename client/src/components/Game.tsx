import { useState, useEffect, useContext } from "react";
import ReactCardFlip from 'react-card-flip';
import {ethers} from 'ethers'

import PlanetList from "./PlanetList";
import Player from './Player';

import opponent_view from '../images/opponent_view.png';
import planet_data from '../images/planet_data.png';
import planet_card_back_top from '../images/planet_card_back_top.png';
import planet_card_deck from '../images/planet_card_deck.png';
import planet_card_front from '../images/planet_card_front.png';

const {GameRoomStatus, PlanetData, PlayerData} = require('../helpers/gameContext');

function Game() {

  const [planetsList, updatePlanetsList] = useState([
    {'name': 'Mercury', 'photo': 'https://i.postimg.cc/rySqCV5n/mercury.png', 'shares': 2000, 'price': 250, 'marketValue': 500000, 'changeStatus': '', 'changeAmount': 0},
    {'name': 'Venus', 'photo': 'https://i.postimg.cc/BQpskmY2/venus.png', 'shares': 2000, 'price': 250, 'marketValue': 500000, 'changeStatus': '', 'changeAmount': 0},
    {'name': 'Earth', 'photo': 'https://i.postimg.cc/d0kY7wq9/earth.png', 'shares': 2000, 'price': 250, 'marketValue': 500000, 'changeStatus': '', 'changeAmount': 0},
    {'name': 'Mars', 'photo': 'https://i.postimg.cc/63Cx0c42/mars.png', 'shares': 2000, 'price': 250, 'marketValue': 500000, 'changeStatus': '', 'changeAmount': 0},
    {'name': 'Jupiter', 'photo': 'https://i.postimg.cc/Dyv3rqv0/jupiter.png', 'shares': 2000, 'price': 250, 'marketValue': 500000, 'changeStatus': '', 'changeAmount': 0},
    {'name': 'Saturn', 'photo': 'https://i.postimg.cc/xdbwf5Rx/saturn.png', 'shares': 2000, 'price': 250, 'marketValue': 500000, 'changeStatus': '', 'changeAmount': 0},
    {'name': 'Uranus', 'photo': 'https://i.postimg.cc/QtQv5Mvc/uranus.png', 'shares': 2000, 'price': 250, 'marketValue': 500000, 'changeStatus': '', 'changeAmount': 0},
    {'name': 'Neptune', 'photo': 'https://i.postimg.cc/0j9FCsqF/neptune.png', 'shares': 2000, 'price': 250, 'marketValue': 500000, 'changeStatus': '', 'changeAmount': 0}
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

  const [willTrade, updateWillTrade] = useState([false, '']);
  const [flippedStatus, updateFlippedStatus] = useState(false);
  const {socket, account, contract, updateActiveGameStatus, playerTurn, updatePlayerTurn, playerStatus, cardIndex, updateCardIndex, cardDeck} = useContext(GameRoomStatus)

  function updateTradeStatus(target:string){
    updateWillTrade([!willTrade[0], target]);
  }

  function maxTransRequired(){
     const masterPlanetIndex = getMasterPlanetIndex(cardDeck[cardIndex].planetName);
    const playerPlanetIndex = getPlayerPlanetIndex(cardDeck[cardIndex].planetName);
    const myPortfolio = playerStatus === 'player1' ? player1PortfolioList : player2PortfolioList;
    return willTrade[1] === 'buy' ? Math.min(planetsList[masterPlanetIndex].shares, myPortfolio[0].shares / planetsList[masterPlanetIndex].price) : myPortfolio[playerPlanetIndex].shares;
  }

  function getMasterPlanetIndex(targetValue:string){
    let targetIndex = 0;
    while(planetsList[targetIndex].name !== targetValue){
      ++targetIndex;
    }
    return targetIndex;
  }

  function getPlayerPlanetIndex(targetValue:string){
    let targetIndex = 0;
    while(player1PortfolioList[targetIndex].name !== targetValue){
      ++targetIndex;
    }
    return targetIndex;
  }

  async function endGame(message: boolean){
    let alertBox = document.createElement('div');

    setTimeout(() => {
      alertBox.classList.add('Game-over-breakdown');

      const alertBoxContent = document.createElement('div');
      const alertBoxContentText = document.createTextNode(message ? 'Game Over! You Win The Pot!!!' : 'Game Over... Tough Loss.');
      alertBoxContent.appendChild(alertBoxContentText);
      (alertBox as HTMLInputElement).appendChild(alertBoxContent);

      (document.getElementsByClassName('Stock-table__taj-mahal-dome')[0] as HTMLInputElement).appendChild(alertBox);
    }, 3000)

    setTimeout(() => {
      (document.getElementsByClassName('Stock-table__taj-mahal-dome')[0] as HTMLInputElement).removeChild(alertBox);
    }, 5000);

    setTimeout(() => {
      updateActiveGameStatus(false);
      window.location.reload();
    }, 5000);
  }

  async function updateMyGameData(event:any){
    event.preventDefault();
    socket.then((mySocket:any) =>
      {
        const myCard = cardDeck[cardIndex];
        if(myCard.cardType === 'tnt'){
          mySocket.emit('game_over', false);
        } else {
          const myCard = cardDeck[cardIndex];
          const masterPlanetIndex = getMasterPlanetIndex(myCard.planetName);
          const playerPlanetIndex = getPlayerPlanetIndex(myCard.planetName);
          let myPortfolio;
          let theirPortfolio;
          myPortfolio = playerStatus === 'player1' ? player1PortfolioList : player2PortfolioList;
          theirPortfolio = playerStatus === 'player2' ? player2PortfolioList : player1PortfolioList;
          if(myCard.cardType === 'price'){
            let newMarketValue;
            const priceChange = parseInt(myCard.sharePriceChange) / 100;
            planetsList[masterPlanetIndex].price += Math.round(planetsList[masterPlanetIndex].price * priceChange);
            myPortfolio[playerPlanetIndex].price += Math.round(myPortfolio[playerPlanetIndex].price * priceChange);
            theirPortfolio[playerPlanetIndex].price += Math.round(myPortfolio[playerPlanetIndex].price * priceChange);
            if(myCard.outstandingSharesChange){
              planetsList[masterPlanetIndex].shares = Math.round(planetsList[masterPlanetIndex].marketValue / planetsList[masterPlanetIndex].price);
            } else {
              newMarketValue = planetsList[masterPlanetIndex].price * planetsList[masterPlanetIndex].shares;
              const changeAmt =((newMarketValue - planetsList[masterPlanetIndex].marketValue) / planetsList[masterPlanetIndex].marketValue) * 100;
              planetsList[masterPlanetIndex].changeAmount = Math.abs(changeAmt);
              planetsList[masterPlanetIndex].marketValue = newMarketValue;
              planetsList[masterPlanetIndex].changeStatus = changeAmt === 0 ? '' : changeAmt > 0 ? '+' : '-';
            }
            newMarketValue = myPortfolio[playerPlanetIndex].price * myPortfolio[playerPlanetIndex].shares;
            myPortfolio[playerPlanetIndex].marketValue = newMarketValue;
            newMarketValue = theirPortfolio[playerPlanetIndex].price * theirPortfolio[playerPlanetIndex].shares;
            theirPortfolio[playerPlanetIndex].marketValue = newMarketValue;
          } else if(myCard.cardType === 'trade' && willTrade[0]){
              const inputValue = (document.getElementsByClassName('Card-front-input')[0] as HTMLInputElement).value;
              const numberCheck = inputValue.match(/^\d+$/);
              if(numberCheck && numberCheck[0] === inputValue){
                const shareRequestTotal = Math.abs(parseInt(inputValue)) * (willTrade[1] === 'buy' ? 1 : -1);
                myPortfolio[0].shares -= shareRequestTotal * myPortfolio[playerPlanetIndex].price;
                myPortfolio[0].marketValue = myPortfolio[0].shares;
                planetsList[masterPlanetIndex].shares -= shareRequestTotal;
                planetsList[masterPlanetIndex].marketValue = planetsList[masterPlanetIndex].price * planetsList[masterPlanetIndex].shares;
                myPortfolio[playerPlanetIndex].shares += shareRequestTotal;
                myPortfolio[playerPlanetIndex].marketValue = myPortfolio[playerPlanetIndex].price * myPortfolio[playerPlanetIndex].shares;
                (document.getElementsByClassName('Card-front-input')[0] as HTMLInputElement).value = '';
              }
          }
          if(myPortfolio.reduce((prev:any, curr:any) => prev + curr.marketValue, 0) >= 1000000000){
            mySocket.emit('game_over', true);
          } else if(theirPortfolio.reduce((prev:any, curr:any) => prev + curr.marketValue, 0) >= 1000000000){
            mySocket.emit('game_over', false);
          } else {
            planetsList.sort((planetOne, planetTwo) => planetTwo.marketValue-planetOne.marketValue);
            updatePlanetsList(planetsList);
            updatePlayerTurn(false);
            if(playerStatus === 'player1'){
              updatePlayer1PortfolioList(myPortfolio);
              updatePlayer2PortfolioList(theirPortfolio);
            } else {
              updatePlayer2PortfolioList(myPortfolio);
              updatePlayer1PortfolioList(theirPortfolio);
            }
            mySocket.emit('update_game', [cardIndex + 1, playerStatus, theirPortfolio, myPortfolio, planetsList]);
            flipCard(event);
          }
        }
      }
    );
  }

  function flipCard(event:any) {
    updateFlippedStatus(!flippedStatus);
    if(flippedStatus){
      setTimeout(() => {updateCardIndex(cardIndex + 1);}, 2000);
    }
    if(cardDeck[cardIndex].cardType === 'tnt'){
      updateMyGameData(event)
    }
  }

  useEffect(() => {
    async function updateTheirGameData(){
      socket.then((mySocket:any) =>
        mySocket.on('new_game_update', (message: any) =>
        {
          if(willTrade){
            updateWillTrade([false, '']);
          }
          updateCardIndex(message[0]);
          const playerTarget = message[1];
          if(playerTarget === 'player1'){
            updatePlayer1PortfolioList(message[2]);
            updatePlayer2PortfolioList(message[3]);
          } else {
            updatePlayer2PortfolioList(message[2]);
            updatePlayer1PortfolioList(message[3]);
          }
          updatePlanetsList(message[4]);
          updatePlayerTurn(true);
        },
        mySocket.on('game_is_over', async (message:any, roomId:any) => {
          if(message){
            await contract.winnerWithdrawFunds(roomId as string);
          } else {
            await contract.clearActiveGame();
          }
          await endGame(message);
        })
      ));
    }
    updateTheirGameData();
  }, []);

  return (
    <header className="All-background" id='Game-background'>
      <div className="Game-status-section">
        <button id="Game-rules">Rules</button>
        <img id="Game-opponent-view" src={opponent_view} alt="Opponent view"/>
        <div className="Game-button" id="Game-player-total">$2000.00</div>
      </div>
      <div className="Game-status-section">
        <div className="Game-planet-data">
          <div className="Game-planet-data-name">Mars</div>
          <div className="Game-planet-data-total">$500.00</div>
        </div>
        <div className='Game-planet-data'>
          <div className="Game-planet-data-name">Jupiter</div>
          <div className="Game-planet-data-total">$500.00</div>
        </div>
        <div className='Game-planet-data'>
          <div className="Game-planet-data-name">Saturn</div>
          <div className="Game-planet-data-total">$500.00</div>
        </div>
        <div className='Game-planet-data'>
          <div className="Game-planet-data-name">Uranus</div>
          <div className="Game-planet-data-total">$500.00</div>
        </div>
      </div>
      <div id="Game-cards-section">
        <img src={planet_card_deck} alt="Planet Card Deck"/>
        <div id="Game-cards-active">
          <div className="Game-cards" id="Game-cards-outer-right"/>
          <div className="Game-cards" id="Game-cards-inner-left"/>
          <div className="Game-cards"/>
          <div className="Game-cards" id="Game-cards-inner-right"/>
          <div className="Game-cards" id="Game-cards-outer-right"/>
        </div>
      </div>
    </header>
  )
    {/*<div className="Live-game__structure">
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
                    <button className="Card-button" onClick={async (event) => flipCard(event)} disabled={!playerTurn}>
                      <div className="Card Card-back">
                        <div className="Card-back-text">$pace</div>
                        <img className="Card-back-image" src="https://i.postimg.cc/LsC4YHZy/president.png"/>
                        <div className="Card-back-text">Baron$</div>
                      </div>
                    </button>
                    <div className="Card-button">
                      <div className="Card Card-front">
                          {cardDeck.length > 0 ?
                          <div className="Card-front-data">
                            <img className="Card-front-image" src={cardDeck[cardIndex].planetPhoto}/>
                            <div className="Card-front-name">{cardDeck[cardIndex].planetName}</div>
                            <div className="Card-front-description">{cardDeck[cardIndex].photoDescription}</div>
                            {cardDeck[cardIndex].cardType === 'trade' ?
                              <div style={{width: '80%'}}>
                                { willTrade[0] ?
                                  <div className="Card-front-button-group">
                                    <form className='Card-front-button-form' onSubmit={async (event) => await updateMyGameData(event)}>
                                      <input className="Card-front-input" type='number' min={0} max={maxTransRequired()} placeholder='Enter desired shares here...' required={true}/>
                                      <input className="Card-front-button" type="submit" value="Done"></input>
                                    </form>
                                  </div> :
                                  <div className="Card-front-button-group">
                                    <button className="Card-front-button" onClick={async () => updateTradeStatus('buy')}>Buy</button>
                                    <button className="Card-front-button" onClick={async () => updateTradeStatus('sell')}>Sell</button>
                                    <button className="Card-front-button" onClick={async (event) => await updateMyGameData(event)}>Pass</button>
                                  </div>
                                }
                              </div> : cardDeck[cardIndex].cardType === 'price' ?
                              <button className="Card-front-button" onClick={async (event) => await updateMyGameData(event)}>Done</button> :
                              <div></div>
                            }
                          </div>
                          : <div/>}
                      </div>
                    </div>
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
    </div>*/}

}

export default Game;
