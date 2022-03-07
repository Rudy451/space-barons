import { useContext } from "react";
import { GameRoomStatus } from "../helpers/gameContext";

const {PlayerData} = require('../helpers/gameContext');

function Player(props:any) {

const {playerPortfolioList} = useContext(PlayerData);

  return (
    <button className={`Player-profile ${props.turn ? 'Player-profile-turn' : 'Player-profile-inactive'}`} onClick={() => alert("HI THERE!!!!")} disabled={props.player === 'TBD'}>
      <img className='Player-avatar' src={props.avatar} />
      <div>{`${props.player} $${props.player === 'TBD' ? 0 : playerPortfolioList.reduce((prev:any, curr:any) => prev + curr.marketValue, 0)}`}</div>
    </button>
  );
}

export default Player;
