export default function PlayerCard(props:any) {
  return (
    <div className="Game-cards1" id={`Game-cards-${props.card_spot}`}>
      <div id="Game-cards-main-content">
        <div id="Game-cards-name">Planet</div>
        <div id="Game-cards-sub-content">
          <div>Photo</div>
          <div>Description</div>
        </div>
      </div>
    </div>
  )
}
