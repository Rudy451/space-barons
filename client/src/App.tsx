import React, {useEffect, useContext, useState} from 'react';
import ReactCardFlip from 'react-card-flip';
import { Socket } from 'socket.io-client';
import './App.css';
const {connectToSocket} = require("./helperFunctions");

function Card() {
  const [flippedStatus, updateFlippedStatus] = useState(false);

  function flipCard() {
    updateFlippedStatus(!flippedStatus);
  }

  return (
    <ReactCardFlip isFlipped={flippedStatus} flipSpeedBackToFront={1} flipSpeedFrontToBack={1} flipDirection="horizontal">
      <button className="Card-button" onClick={() => flipCard()}>
        <div className="Card Card-back">
          <div className="Card-back-text">$pace</div>
          <img className="Card-back-image" src="https://i.postimg.cc/LsC4YHZy/president.png"/>
          <div className="Card-back-text">Baron$</div>
        </div>
      </button>
      <button className="Card-button" onClick={() => flipCard()}>
        <div className="Card Card-front"></div>
      </button>
    </ReactCardFlip>
  )
}

function Planet(props:any) {
  console.log(props)
  return(
    <div className="Planet">
      <img className='Planet-pic' src={props.planet.photo} alt={props.planet.name}/>
      <div>{props.planet.name}</div>
      <div>{`${props.planet.shares} Shares @ $${props.planet.price}/Share`}</div>
      <div>{`${props.planet.changeStatus} ${props.planet.changeAmount}`}</div>
    </div>
  )
}

function PlanetList() {

  const [planetsList, updatePlanetsList] = useState([
    {"name": "Mercury", "photo": 'https://i.postimg.cc/rySqCV5n/mercury.png', "shares": 250, "price": 2, "marketValue": 500, "changeStatus": null, "changeAmount": 0},
    {"name": "Venus", "photo": 'https://i.postimg.cc/BQpskmY2/venus.png', "shares": 250, "price": 2, "marketValue": 500, "changeStatus": null, "changeAmount": 0},
    {"name": "Earth", "photo": 'https://i.postimg.cc/d0kY7wq9/earth.png', "shares": 250, "price": 2, "marketValue": 500, "changeStatus": null, "changeAmount": 0},
    {"name": "Mars", "photo": 'https://i.postimg.cc/63Cx0c42/mars.png', "shares": 250, "price": 2, "marketValue": 500, "changeStatus": null, "changeAmount": 0},
    {"name": "Jupiter", "photo": 'https://i.postimg.cc/Dyv3rqv0/jupiter.png', "shares": 250, "price": 2, "marketValue": 500, "changeStatus": null, "changeAmount": 0},
    {"name": "Saturn", "photo": 'https://i.postimg.cc/xdbwf5Rx/saturn.png', "shares": 250, "price": 2, "marketValue": 500, "changeStatus": null, "changeAmount": 0},
    {"name": "Uranus", "photo": 'https://i.postimg.cc/QtQv5Mvc/uranus.png', "shares": 250, "price": 2, "marketValue": 500, "changeStatus": null, "changeAmount": 0},
    {"name": "Neptune", "photo": 'https://i.postimg.cc/0j9FCsqF/neptune.png', "shares": 250, "price": 2, "marketValue": 500, "changeStatus": null, "changeAmount": 0}
  ]);

  return(
    <div className="Planet-list">
      {planetsList.map((planet, idx) => <Planet key={idx} planet={planet} planetsList={planetsList} updatePlanetsList={() => updatePlanetsList}/>)}
    </div>
  )
}

function Game() {

  async function copyToClipboard(){
    try {
      await navigator.clipboard.writeText("Cryptic Code");
      alert("Copied to clipboard");
    } catch {
      alert("Something went wrong");
    }
  }

  return (
    <div className="Live-game__structure">
      <div className="Scoreboard">
        <div className="User-profile">
          <div>Photo</div>
          <div>Currency: </div>
          <div>Stock: </div>
          <div>Bonds: </div>
          <hr/>
          <div>Total: </div>
        </div>
        <button className="Copy-clipboard" type="submit" onClick={() => copyToClipboard()}>
          <div>Room #348820482</div>
        </button>
        <div className="User-profile">
          <div>Photo</div>
          <div>Currency: </div>
          <div>Stock: </div>
          <div>Bonds: </div>
          <hr/>
          <div>Total: </div>
        </div>
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
                  <Card/>
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
          <PlanetList></PlanetList>
        </div>
      </div>
    </div>
  )
}

function Room() {
  const [currentRoom, updateCurrentRoom] = useState("");
  const {socket, activeGameStatus, updateActiveGameStatus} = useContext(GameRoomStatus)

  function handleRoomUpdate(event: React.ChangeEvent<any>){
    const newRoomId = event.target.value;
    updateCurrentRoom(newRoomId);
  }

  async function startNewGame(event:any){
    event.preventDefault();
    socket
    .then((newSocket:any) => {
      if(newSocket === undefined){
        throw Error("Couldn't connect");
      } else {
        return newSocket;
      }})
    .then((newSocket:Socket) => {
      newSocket.emit("start_new_game");
      newSocket.on("started_new_game", () => {
        updateActiveGameStatus(true);
      })
      newSocket.on("failed_to_start_game", () => {throw Error("Failed to start game")})
    })
    .catch((error:string) => {
      alert(error)
    })
  }

  async function joinExistingGame(event: React.FormEvent<any>){
    event.preventDefault();
    socket
    .then((newSocket:any) => {
      if(newSocket === undefined || currentRoom === undefined || currentRoom.trim().length === 0){
        throw Error("Invalid RoomID entry");
      } else {
        return newSocket;
      }})
    .then((newSocket:Socket) => {
      newSocket.emit("join_existing_game", currentRoom);
      newSocket.on("joined_existing_game", () => {
        updateActiveGameStatus(true);
      })
      newSocket.on("failed_to_join_existing_game", () => {throw Error("Failed to rejoin game")})
    })
    .catch((error:string) => {
      alert(error)
    })
  }

  return (
    <div>
      <h3>Click to join a New Game</h3>
      <button onClick={(event) => startNewGame(event)} disabled={activeGameStatus}>
        Start New Game
      </button>
      <br/>
      <form onSubmit={(event) => joinExistingGame(event)}>
        <h3>Enter Room ID to rejoin an Existing Game</h3>
        <input placeholder="Enter Room ID" value={currentRoom} onChange={handleRoomUpdate}></input>
        <button type="submit" disabled={activeGameStatus}>Join</button>
      </form>
    </div>
  )
}

const GameRoomStatus = React.createContext({
  socket: new Promise(() => {}),
  activeGameStatus: false,
  updateActiveGameStatus: (activeStatus: boolean) => {},
});

const socket = connectToSocket();

function App() {
  const [activeGameStatus, updateActiveGameStatus] = useState(false);
  /*
  return (
    <div>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Peralta&family=Rowdies:wght@300;400&display=swap');
        </style>
      </head>
      <div className="Game-background">
        <Game></Game>
      </div>
    </div>
  )*/

  return (
    <GameRoomStatus.Provider value={{socket, activeGameStatus, updateActiveGameStatus}}>
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

export default App;
