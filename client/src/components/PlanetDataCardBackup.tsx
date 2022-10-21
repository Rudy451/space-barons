import { useContext } from "react";
const {PlanetData} = require('../helpers/gameContext');

function Planet(props:any) {

  const {planetsList} = useContext(PlanetData);

  return(
    <div className={`Planet ${planetsList[props.idx].changeStatus === '' ? '' : planetsList[props.idx].changeStatus === '+' ? 'Planet-font-inc' : 'Planet-font-dec'}`}>
      <img className='Planet-pic' src={planetsList[props.idx].photo} alt={planetsList[props.idx].name}/>
      <div>{planetsList[props.idx].name}</div>
      <div>{`${planetsList[props.idx].shares} Shrs @ $${planetsList[props.idx].price}/Shr`}</div>
      <div>{`${planetsList[props.idx].changeStatus}${planetsList[props.idx].changeAmount}%`}</div>
    </div>
  )
}

export default Planet;
