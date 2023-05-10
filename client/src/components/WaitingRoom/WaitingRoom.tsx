import {useContext} from 'react';
import { Socket } from 'socket.io-client';

import player1 from '../images/player1.png';
import player2 from '../images/player2.png';

const {GameRoomStatus} = require('../helpers/gameContext');

export default function WaitingRoom() {
  const {socket, contract, activeGameStatus, updateActiveGameStatus, playerTurn} = useContext(GameRoomStatus);

  async function cancelGame(event:any){
    event.preventDefault();
    socket
    .then((mySocket:Socket) => {
      if(mySocket === undefined){
        throw Error("Couldn't connect");
      } else {
        return mySocket;
      }})
    .then(async (mySocket:Socket) => {
      await contract.clearBuggedGame();
      return true
    }).then(async (result:boolean) => {
      updateActiveGameStatus(false);
    })
    .catch((error:string) => {
      alert(error)
    })
  }

  return (
    <header className="All-background" id="Waiting-background">
      <div id="Waiting-title">Waiting...</div>
      <div id="Waiting-player-section">
        <img className="Waiting-player-window" style={{["--marginStart" as any]: "-100vw"}} src={player1} alt="Player #1"/>
        <img className="Waiting-player-window" style={{["--marginStart" as any]: "200vw"}} src={player2} alt="Player #2"/>
      </div>
      <div id="Waiting-planet-background">
        <div id="Waiting-subtitle">Read the rules while you're waiting...</div>
        <button className='Game-button' onClick={(event) => cancelGame(event)} disabled={activeGameStatus && playerTurn}>
          Cancel
        </button>
      </div>
    </header>
  )
}
