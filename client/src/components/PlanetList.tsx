import { useContext } from 'react';
import Planet from './Planet';

const {PlanetData} = require('../helpers/gameContext');

function PlanetList() {

  const {planetsList} = useContext(PlanetData);

  return(
    <div className="Planet-list">
      {planetsList.map((planet:any, idx:any) => <Planet idx={idx}/>)}
    </div>
  )
}

export default PlanetList;
