import { useContext } from 'react';
import PlanetOwnershipCard from './PlanetOwnershipCard/PlanetOwnershipCard';

const {PlanetData} = require('../helpers/gameContext');

function PlanetList() {

  const {planetsList} = useContext(PlanetData);

  return(
    <div className="Planet-list">
      {planetsList.map((planet:any, idx:any) => <PlanetOwnershipCard key={idx} idx={idx}/>)}
    </div>
  )
}

export default PlanetList;
