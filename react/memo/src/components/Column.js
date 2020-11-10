import Card from './Card';

function Column(props) {
  return (
    <section className="col">
      <h3>{props.col_name}</h3>
      {props.cards.map(card => <Card key={card.id} card={card} />)}
    </section>
  );
}
export default Column;