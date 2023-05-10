import { useContext } from "react";
import { Socket } from 'socket.io-client';
import {ethers} from 'ethers';

import rocket from '../images/rocket.png';
import badge from '../images/badge.png';
import asteroid_foreground from '../images/asteroid_foreground.png';
import asteroid_center from '../images/asteroid_center.png';
import asteroid_background from '../images/asteroid_background.png';

const {GameRoomStatus} = require('../../helpers/gameContext');
const {connect, deliver} = require('../../helpers/webSocketFunctions');

export default function HomePage() {
  const {socket, account, contract, activeGameStatus, updateActiveGameStatus} = useContext(GameRoomStatus);

  async function startNewGame(event:any){
    event.preventDefault();
    connect( async (msg:any) => {
      await account.enable();
    })
    /*socket
    .then((mySocket:any) => {
      if(mySocket === undefined){
        throw Error("Couldn't connect");
      } else {
        return mySocket;
      }})
    .then(async (mySocket:Socket) => {
      await account.enable();
      mySocket.emit('start_new_game');
      mySocket.on('started_new_game', async (myRoom:any) => {
        const options = {value: ethers.utils.parseEther('1.0')}
        await contract.participantDepositFunds(myRoom as any, options);
        updateActiveGameStatus(true);
      })
      mySocket.on('failed_start_game', () => {throw Error('Failed to start game')})
    })
    .catch((error:string) => {
      alert(error)
    })*/
    socket.onopen = () => {
      console.log("Socket Connected");
    }
  }

  return (
    <header className="All-background" id='Welcome-background'>
      <div className="Welcome-badge">
        <div className="Welcome-title">
          <h1 className="Welcome-title-space">SPACE</h1>
          <h1 className="Welcome-title-barons">BARONS</h1>
        </div>
        <div className="Welcome-subtitle">
          <h4 className="Welcome-subtitle-top">A game of mental fortitude to accomplish crazy</h4>
          <h4 className="Welcome-subtitle-bottom">feats in space and the financial abyss</h4>
        </div>
        <div className='Room-Section'>
          <button className='Game-button' onClick={(event) => startNewGame(event)} disabled={activeGameStatus}>
            Launch
          </button>
        </div>
      </div>
      <div>
        <img id="Welcome-rocket" src={rocket} alt="Fuck"/>
      </div>
      <div id="Welcome-asteroids">
        <img id="Welcome-asteroid-foreground" src={asteroid_foreground} alt="Asteroid foreground"/>
        <img id="Welcome-asteroid-center" src={asteroid_center} alt="Asteroid center"/>
        <img id="Welcome-asteroid-background" src={asteroid_background} alt="Asteroid background"/>
      </div>
      <div className="Welcome-large-shooting-star" style={{"top": "80vh", "left": "8vw"}}/>
      <div className="Welcome-large-shooting-star" style={{"top": "95vh", "left": "5vw"}}/>
      <div className="Welcome-large-shooting-star" style={{"top": "110vh", "left": "49vw"}}/>
      <div className="Welcome-small-shooting-star" style={{"top": "90vh", "left": "59vw"}}/>
      <div className="Welcome-small-shooting-star" style={{"top": "74vh", "left": "90vw"}}/>
      <div className="Welcome-small-shooting-star" style={{"top": "100vh", "left": "74vw"}}/>
      <div className="Welcome-big-white-star" style={{"top": "52vh", "left": "72vw"}}/>
      <div className="Welcome-big-white-star" style={{"top": "94vh", "left": "77vw"}}/>
      <div className="Welcome-big-white-star" style={{"top": "11vh", "left": "35vw"}}/>
      <div className="Welcome-big-white-star" style={{"top": "60vh", "left": "89vw"}}/>
      <div className="Welcome-big-white-star" style={{"top": "28vh", "left": "59vw"}}/>
      <div className="Welcome-big-white-star" style={{"top": "58vh", "left": "81vw"}}/>
      <div className="Welcome-big-white-star" style={{"top": "74vh", "left": "15vw"}}/>
      <div className="Welcome-big-white-star" style={{"top": "19vh", "left": "3vw"}}/>
      <div className="Welcome-big-white-star" style={{"top": "40vh", "left": "7vw"}}/>
      <div className="Welcome-big-white-star" style={{"top": "56vh", "left": "26vw"}}/>
      <div className="Welcome-big-white-star" style={{"top": "69vh", "left": "60vw"}}/>
      <div className="Welcome-dark-blue-star" style={{"top": "89vh", "left": "21vw"}}/>
      <div className="Welcome-dark-blue-star" style={{"top": "7vh", "left": "9vw"}}/>
      <div className="Welcome-dark-blue-star" style={{"top": "88vh", "left": "41vw"}}/>
      <div className="Welcome-dark-blue-star" style={{"top": "37vh", "left": "49vw"}}/>
      <div className="Welcome-dark-blue-star" style={{"top": "92vh", "left": "62vw"}}/>
      <div className="Welcome-dark-blue-star" style={{"top": "98vh", "left": "90vw"}}/>
      <div className="Welcome-dark-blue-star" style={{"top": "58vh", "left": "42vw"}}/>
      <div className="Welcome-dark-blue-star" style={{"top": "87vh", "left": "15vw"}}/>
      <div className="Welcome-dark-blue-star" style={{"top": "52vh", "left": "98vw"}}/>
      <div className="Welcome-dark-blue-star" style={{"top": "79vh", "left": "96vw"}}/>
      <div className="Welcome-dark-blue-star" style={{"top": "31vh", "left": "39vw"}}/>
      <div className="Welcome-dark-blue-star" style={{"top": "50vh", "left": "19vw"}}/>
      <div className="Welcome-dark-blue-star" style={{"top": "85vh", "left": "3vw"}}/>
      <div className="Welcome-dark-blue-star" style={{"top": "62vh", "left": "66vw"}}/>
      <div className="Welcome-dark-blue-star" style={{"top": "35vh", "left": "83vw"}}/>
      <div className="Welcome-dark-blue-star" style={{"top": "23vh", "left": "45vw"}}/>
      <div className="Welcome-dark-blue-star" style={{"top": "42vh", "left": "69vw"}}/>
      <div className="Welcome-dark-blue-star" style={{"top": "14vh", "left": "72vw"}}/>
      <div className="Welcome-medium-blue-star" style={{"top": "14vh", "left": "92vw"}}/>
      <div className="Welcome-medium-blue-star" style={{"top": "58vh", "left": "96vw"}}/>
      <div className="Welcome-medium-blue-star" style={{"top": "46vh", "left": "61vw"}}/>
      <div className="Welcome-medium-blue-star" style={{"top": "61vh", "left": "84vw"}}/>
      <div className="Welcome-medium-blue-star" style={{"top": "87vh", "left": "73vw"}}/>
      <div className="Welcome-medium-blue-star" style={{"top": "89vh", "left": "26vw"}}/>
      <div className="Welcome-medium-blue-star" style={{"top": "5vh", "left": "64vw"}}/>
      <div className="Welcome-medium-blue-star" style={{"top": "97vh", "left": "14vw"}}/>
      <div className="Welcome-medium-blue-star" style={{"top": "67vh", "left": "94vw"}}/>
      <div className="Welcome-medium-blue-star" style={{"top": "95vh", "left": "45vw"}}/>
      <div className="Welcome-medium-blue-star" style={{"top": "67vh", "left": "44vw"}}/>
      <div className="Welcome-medium-blue-star" style={{"top": "44vh", "left": "82vw"}}/>
      <div className="Welcome-medium-blue-star" style={{"top": "10vh", "left": "47vw"}}/>
      <div className="Welcome-medium-blue-star" style={{"top": "27vh", "left": "18vw"}}/>
      <div className="Welcome-medium-blue-star" style={{"top": "82vh", "left": "4vw"}}/>
      <div className="Welcome-medium-blue-star" style={{"top": "5vh", "left": "76vw"}}/>
      <div className="Welcome-medium-blue-star" style={{"top": "58vh", "left": "24vw"}}/>
      <div className="Welcome-medium-blue-star" style={{"top": "93vh", "left": "10vw"}}/>
      <div className="Welcome-medium-blue-star" style={{"top": "12vh", "left": "41vw"}}/>
      <div className="Welcome-medium-blue-star" style={{"top": "79vh", "left": "72vw"}}/>
      <div className="Welcome-medium-blue-star" style={{"top": "52vh", "left": "5vw"}}/>
      <div className="Welcome-medium-blue-star" style={{"top": "26vh", "left": "52vw"}}/>
      <div className="Welcome-medium-blue-star" style={{"top": "8vh", "left": "22vw"}}/>
      <div className="Welcome-medium-blue-star" style={{"top": "29vh", "left": "2vw"}}/>
      <div className="Welcome-small-blue-star" style={{"top": "56vh", "left": "9vw"}}/>
      <div className="Welcome-small-blue-star" style={{"top": "19vh", "left": "17vw"}}/>
      <div className="Welcome-small-blue-star" style={{"top": "63vh", "left": "57vw"}}/>
      <div className="Welcome-small-blue-star" style={{"top": "60vh", "left": "74vw"}}/>
      <div className="Welcome-small-blue-star" style={{"top": "63vh", "left": "24vw"}}/>
      <div className="Welcome-small-blue-star" style={{"top": "74vh", "left": "32vw"}}/>
      <div className="Welcome-small-blue-star" style={{"top": "82vh", "left": "18vw"}}/>
      <div className="Welcome-small-blue-star" style={{"top": "93vh", "left": "4vw"}}/>
      <div className="Welcome-small-blue-star" style={{"top": "76vh", "left": "23vw"}}/>
      <div className="Welcome-small-blue-star" style={{"top": "30vh", "left": "58vw"}}/>
      <div className="Welcome-small-blue-star" style={{"top": "45vh", "left": "48vw"}}/>
      <div className="Welcome-small-blue-star" style={{"top": "58vh", "left": "16vw"}}/>
      <div className="Welcome-small-blue-star" style={{"top": "62vh", "left": "1vw"}}/>
      <div className="Welcome-small-blue-star" style={{"top": "53vh", "left": "33vw"}}/>
      <div className="Welcome-small-blue-star" style={{"top": "72vh", "left": "85vw"}}/>
      <div className="Welcome-small-blue-star" style={{"top": "12vh", "left": "5vw"}}/>
      <div className="Welcome-small-blue-star" style={{"top": "2vh", "left": "31vw"}}/>
      <div className="Welcome-small-blue-star" style={{"top": "24vh", "left": "78vw"}}/>
      <div className="Welcome-small-blue-star" style={{"top": "52vh", "left": "12vw"}}/>
      <div className="Welcome-small-blue-star" style={{"top": "33vh", "left": "61vw"}}/>
      <div className="Welcome-small-blue-star" style={{"top": "90vh", "left": "20vw"}}/>
      <div className="Welcome-small-blue-star" style={{"top": "62vh", "left": "80vw"}}/>
      <div className="Welcome-small-blue-star" style={{"top": "8vh", "left": "46vw"}}/>
      <div className="Welcome-small-blue-star" style={{"top": "19vh", "left": "26vw"}}/>
      <div className="Welcome-small-blue-star" style={{"top": "27vh", "left": "7vw"}}/>
      <div className="Welcome-small-blue-star" style={{"top": "74vh", "left": "2vw"}}/>
      <div className="Welcome-small-blue-star" style={{"top": "1vh", "left": "58vw"}}/>
      <div className="Welcome-small-blue-star" style={{"top": "15vh", "left": "85vw"}}/>
      <div className="Welcome-small-blue-star" style={{"top": "39vh", "left": "86vw"}}/>
      <div className="Welcome-small-blue-star" style={{"top": "4vh", "left": "86vw"}}/>
      <div className="Welcome-small-blue-star" style={{"top": "94vh", "left": "32vw"}}/>
      <div className="Welcome-small-blue-star" style={{"top": "43vh", "left": "2vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "43vh", "left": "77vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "64vh", "left": "18vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "63vh", "left": "38vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "52vh", "left": "12vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "83vh", "left": "27vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "66vh", "left": "6vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "23vh", "left": "68vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "83vh", "left": "79vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "9vh", "left": "99vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "88vh", "left": "59vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "95vh", "left": "17vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "40vh", "left": "89vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "7vh", "left": "79vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "3vh", "left": "92vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "81vh", "left": "31vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "55vh", "left": "25vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "70vh", "left": "40vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "92vh", "left": "76vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "87vh", "left": "67vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "38vh", "left": "13vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "3vh", "left": "19vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "96vh", "left": "72vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "54vh", "left": "41vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "52vh", "left": "91vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "52vh", "left": "91vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "49vh", "left": "45vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "32vh", "left": "54vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "42vh", "left": "64vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "95vh", "left": "25vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "71vh", "left": "10vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "62vh", "left": "49vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "81vh", "left": "37vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "54vh", "left": "48vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "1vh", "left": "30vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "18vh", "left": "45vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "89vh", "left": "47vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "25vh", "left": "42vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "30vh", "left": "48vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "92vh", "left": "1vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "90vh", "left": "33vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "97vh", "left": "38vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "18vh", "left": "50vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "12vh", "left": "54vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "9vh", "left": "88vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "17vh", "left": "90vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "34vh", "left": "98vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "1vh", "left": "1vw"}}/>
      <div className="Welcome-really-small-blue-star" style={{"top": "1vh", "left": "1vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "53vh", "left": "52vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "1vh", "left": "77vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "6vh", "left": "2vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "89vh", "left": "54vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "15vh", "left": "62vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "3vh", "left": "78vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "25vh", "left": "57vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "4vh", "left": "27vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "40vh", "left": "60vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "30vh", "left": "29vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "73vh", "left": "90vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "10vh", "left": "64vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "4vh", "left": "22vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "22vh", "left": "12vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "97vh", "left": "19vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "83vh", "left": "92vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "2vh", "left": "73vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "50vh", "left": "65vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "10vh", "left": "15vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "77vh", "left": "87vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "37vh", "left": "5vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "61vh", "left": "61vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "39vh", "left": "44vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "67vh", "left": "79vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "7vh", "left": "39vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "19vh", "left": "58vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "70vh", "left": "69vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "40vh", "left": "74vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "93vh", "left": "58vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "90vh", "left": "95vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "92vh", "left": "84vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "98vh", "left": "52vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "20vh", "left": "95vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "26vh", "left": "63vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "3vh", "left": "45vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "8vh", "left": "70vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "58vh", "left": "71vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "67vh", "left": "62vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "22vh", "left": "87vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "31vh", "left": "93vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "1vh", "left": "97vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "44vh", "left": "94vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "17vh", "left": "69vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "7vh", "left": "60vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "3vh", "left": "4vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "44vh", "left": "4vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "12vh", "left": "1vw"}}/>
      <div className="Welcome-really-small-light-blue-star" style={{"top": "49vh", "left": "1vw"}}/>
  </header>
  )
}
