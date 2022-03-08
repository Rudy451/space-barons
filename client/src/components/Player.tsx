import { useContext } from "react";

const {PlayerData} = require('../helpers/gameContext');

function Player(props:any) {

const {playerPortfolioList} = useContext(PlayerData);

  function getPlayerPortfolio(){

    let alertBox = document.createElement('div');
    alertBox.classList.add('Player-portfolio-breakdown');
    const alertBoxContent = document.createElement('div');
    alertBoxContent.classList.add('AlertBoxContent__styling');

    for(let security of playerPortfolioList){

      const alertBoxSubcontent = document.createElement('div');
      alertBoxSubcontent.classList.add('AlertBoxSubcontent__styling');

      let alertBoxSecurityContainer = document.createElement('div');
      alertBoxSecurityContainer.classList.add('AlertBoxSecurityContainer__styling');

      const alertBoxSecurityName = document.createElement('div');
      alertBoxSecurityName.classList.add('AlertBoxSecurityName__styling');
      const alertBoxSecurityNameContent = document.createTextNode(security.name);
      (alertBoxSecurityName as HTMLInputElement).appendChild(alertBoxSecurityNameContent);

      const alertBoxSecurityDistribution = document.createElement('div');
      alertBoxSecurityDistribution.classList.add('AlertBoxSecurityDistribution__styling');
      const alertBoxSecurityDistributionContent = document.createTextNode(`${security.shares} shares @ $${security.price}/share`);
      (alertBoxSecurityDistribution as HTMLInputElement).appendChild(alertBoxSecurityDistributionContent);

      (alertBoxSecurityContainer as HTMLInputElement).appendChild(alertBoxSecurityName);
      (alertBoxSecurityContainer as HTMLInputElement).appendChild(alertBoxSecurityDistribution);

      let alertBoxCommaSection = document.createElement('div');
      alertBoxCommaSection.classList.add('AlertBoxCommaSection__styling');
      const alertBoxCommentSectionContent = document.createTextNode('....................');
      (alertBoxCommaSection as HTMLInputElement).appendChild(alertBoxCommentSectionContent);

      let alertBoxSecurityMarketValue = document.createElement('div');
      alertBoxSecurityMarketValue.classList.add('AlertBoxSecurityMarketvalue__styling');

      const alertBoxSecurityMVText = document.createTextNode(`$${security.marketValue}.00`);
      (alertBoxSecurityMarketValue as HTMLInputElement).appendChild(alertBoxSecurityMVText);

      (alertBoxSubcontent as HTMLInputElement).appendChild(alertBoxSecurityContainer);
      (alertBoxSubcontent as HTMLInputElement).appendChild(alertBoxCommentSectionContent);
      (alertBoxSubcontent as HTMLInputElement).appendChild(alertBoxSecurityMarketValue);
      (alertBoxContent as HTMLInputElement).appendChild(alertBoxSubcontent);
    }

    const alertBoxPortfolioTotalBox = document.createElement('div');
    alertBoxPortfolioTotalBox.classList.add('AlertBoxSubcontent__styling');

    const alertBoxPortfolioTotalTitle = document.createElement('div');
    alertBoxPortfolioTotalTitle.classList.add('AlertBoxSecurityName__styling');
    const alertBoxPortfolioTotalTitleContent = document.createTextNode('Total');
    (alertBoxPortfolioTotalTitle as HTMLInputElement).appendChild(alertBoxPortfolioTotalTitleContent);

    const alertBoxPortfolioTotalValue = document.createElement('div');
    alertBoxPortfolioTotalValue.classList.add('AlertBoxSecurityMarketvalue__styling');
    const alertBoxPortfolioTotalValueContent = document.createTextNode(`$${playerPortfolioList.reduce((prev:any, curr:any) => prev + curr.marketValue, 0)}.00`);
    (alertBoxPortfolioTotalValue as HTMLInputElement).appendChild(alertBoxPortfolioTotalValueContent);

    (alertBoxPortfolioTotalBox as HTMLInputElement).appendChild(alertBoxPortfolioTotalTitle);
    (alertBoxPortfolioTotalBox as HTMLInputElement).appendChild(alertBoxPortfolioTotalValue);
    (alertBoxContent as HTMLInputElement).appendChild(alertBoxPortfolioTotalBox);

    let alertBoxButtonContainer = document.createElement('div');
    alertBoxButtonContainer.classList.add('AlertBoxButtonContainer__styling');

    let alertBoxButton = document.createElement('button');
    const alertBoxButtonContent = document.createTextNode('Done');
    alertBoxButton.classList.add('Card-front-button');

    (alertBoxButton as HTMLInputElement).appendChild(alertBoxButtonContent);
    (alertBoxButton as HTMLInputElement).addEventListener('click', () => {dropPlayerPortfio()});
    (alertBoxButtonContainer as HTMLInputElement).appendChild(alertBoxButton);

    (alertBox as HTMLInputElement).appendChild(alertBoxContent);
    (alertBox as HTMLInputElement).appendChild(alertBoxButtonContainer);

    (document.getElementsByClassName('Stock-table__taj-mahal-dome')[0] as HTMLInputElement).appendChild(alertBox);
  }

  function dropPlayerPortfio(){
    const alertBox = document.getElementsByClassName('Player-portfolio-breakdown')[0];
    (document.getElementsByClassName('Stock-table__taj-mahal-dome')[0] as HTMLInputElement).removeChild(alertBox);
  }

  return (
    <button className={`Player-profile ${props.turn ? 'Player-profile-turn' : 'Player-profile-inactive'}`} onClick={() => getPlayerPortfolio()} disabled={props.player === 'TBD'}>
      <img className='Player-avatar' src={props.avatar} />
      <div>{`${props.player} $${props.player === 'TBD' ? 0 : playerPortfolioList.reduce((prev:any, curr:any) => prev + curr.marketValue, 0)}`}</div>
    </button>
  );
}

export default Player;
