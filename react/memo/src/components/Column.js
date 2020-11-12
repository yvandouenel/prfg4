import Card from './Card';

function Column(props) {
  return (
    <section className="col">
      <div className="d-flex mb-3">
        <button 
          onClick={()=> {
            props.onClickButtonAddCard(props.col_id, props.col_index)
          }}
          className="btn btn-success mr-2">
          +
        </button>
        <h3>{props.col_name}</h3>
      </div>
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