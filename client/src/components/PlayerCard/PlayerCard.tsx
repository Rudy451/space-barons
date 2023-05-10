import './PlayerCard.css';

export default function PlayerCard(props:any) {
  return (
    <div className="Game-cards" id={`Game-cards-${props.card_spot}`}>
      <div id="Game-cards-main-content">
        <div id="Game-cards-name">Planet</div>
        <div id="Game-cards-sub-content">
          <div id="Game-cards-photo"/>
          <div id="Game-cards-description">Description</div>
        </div>
      </div>
    </div>
  )
}
