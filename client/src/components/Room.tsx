import { useContext } from "react";
import { Socket } from 'socket.io-client';

const {GameRoomStatus} = require('../helpers/gameContext');

function Room() {
  const {socket, account, activeGameStatus, updateActiveGameStatus} = useContext(GameRoomStatus);

  async function startNewGame(event:any){
    event.preventDefault();
    socket
    .then((mySocket:any) => {
      if(mySocket === undefined){
        throw Error("Couldn't connect");
      } else {
        return mySocket;
      }})
    .then(async (mySocket:Socket) => {
      await account.enable();
      mySocket.emit('start_new_game');
      mySocket.on('started_new_game', async () => {
        updateActiveGameStatus(true);
      })
      mySocket.on('failed_start_game', () => {throw Error('Failed to start game')})
    })
    .catch((error:string) => {
      alert(error)
    })
  }

  return (
    <div className='Room-Section'>
      <h3 className='Welcome-subheading'>Click to join a New Game</h3>
      <button className='Start-Game-Button' onClick={(event) => startNewGame(event)} disabled={activeGameStatus}>
        Start New Game
      </button>
    </div>
  )
}

export default Room;
