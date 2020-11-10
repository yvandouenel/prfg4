/**
 * Stateless component : une simple fonction (attention, on utilise plus le "this")
 * @param {} props 
 */
function Card(props) {
  return (
    <article className="bg-secondary p-3 text-white mb-3 rounded d-flex">
      <button className="btn btn-warning mr-2">&#60;
      </button>
      <div>
        <h4>{props.card.question}</h4>
        <h3>{props.card.reponse}</h3>
        <p>{props.card.explication}</p>
      </div>
      <button
        onClick={() => {props.onClickCardRight(props.col_index, props.card_index)}}
        className="btn btn-warning ml-2">&#x3E;
     </button>
    </article>

  );
}
export default Card;