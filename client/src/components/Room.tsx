import { useContext } from "react";
import { Socket } from 'socket.io-client';

const {GameRoomStatus} = require('../helpers/gameContext');

function Room() {
  const {socket, activeGameStatus, updateActiveGameStatus, updateRoomId, updatePlayerTurn} = useContext(GameRoomStatus);

  async function startNewGame(event:any){
    event.preventDefault();
    socket
    .then((mySocket:any) => {
      if(mySocket === undefined){
        throw Error("Couldn't connect");
      } else {
        return mySocket;
      }})
    .then((mySocket:Socket) => {
      mySocket.emit("start_new_game");
      mySocket.on("started_new_game", (newRoomId, startPlayer) => {
        updateActiveGameStatus(true);
        updateRoomId(newRoomId);
        updatePlayerTurn(startPlayer);
      })
      mySocket.on("failed_start_game", () => {throw Error("Failed to start game")})
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
    </div>
  )
}

export default Room;
