import React, {useEffect, useContext, useState} from 'react';
import { Socket } from 'socket.io-client';
import './App.css';
const {connectToSocket} = require("./helperFunctions");

function Planet(){
  return(
    <div className="Planet">
      <div>Photo</div>
      <div>{`${192} Shares @ $${1}/Share`}</div>
      <div>{`Up Amt`}</div>
    </div>
  )
}

function PlanetList(){
  return(
    <div className="Planet-list">
      {[0, 1, 2, 3, 4, 5, 6, 7].map(val => <Planet/>)}
    </div>
  )
}

function Game(){
  return (
    <div className="Live-game__structure">
      <div className="Scoreboard">
        <div>
          <div>Name</div>
          <div>Photo</div>
          <div>Currency: </div>
          <div>Stock: </div>
          <div>Bonds: </div>
          <hr/>
          <div>Total: </div>
        </div>
        <div>Room #</div>
        <div>
          <div>Name</div>
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
              <div className="Stock-table__taj-mahal-dome"/>
              <div className="Stock-table__taj-mahal-base">
                <img className="Sun" src="https://i.postimg.cc/LsC4YHZy/president.png"/>
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
      <div className="Cards-table">
        <div className="Card-piles">
          <div className="Card"></div>
          <div>Picked Cards</div>
        </div>
        <button>Your Turn</button>
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

  return (
    <div className="Game-background">
      <Game></Game>
    </div>
  )

  /*return (
    <GameRoomStatus.Provider value={{socket, activeGameStatus, updateActiveGameStatus}}>
      <div className="App App-header">
        {
          activeGameStatus ?
          <Game></Game> :
          <header>
            <h1>Welcome To $pace Barons</h1>
            <h2>Ready To $tart Your Trek To Trillion$???</h2>
            <Room></Room>
          </header>
        }
      </div>
    </GameRoomStatus.Provider>
  );*/
}

export default App;
