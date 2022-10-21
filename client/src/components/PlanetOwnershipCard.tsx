import { useContext } from "react";
const {PlanetData} = require('../helpers/gameContext');

export default function PlanetOwnershipCard(props:any) {

  const {planetsList} = useContext(PlanetData);

  return(
    <div className="Game-planet-data">
      <div id="Game-planet-data-photo"/>
      <div id="Game-planet-data-name">Jupiter</div>
      <div id="Game-planet-data-total">$0.00</div>
      <div id="Game-planet-data-assets">
        <div id="Game-planet-data-assets-names"/>
        <div id="Game-planet-data-assets-totals">
          <div>$0.00</div>
          <div>$0.00</div>
        </div>
      </div>
    </div>
  )
}
