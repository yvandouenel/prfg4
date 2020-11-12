import Card from './Card';

function Column(props) {
  return (
    <section className="col">
      <h3>{props.col_name}</h3>
      {props.cards.map((card, index) => 
      <Card 
        key={card.id} 
        card={card} 
        onClickCardMove={props.onClickCardMove}
        col_index={props.col_index}
        card_index={index}
      />)}
    </section>
  );
}
export default Column;