/**
 * Stateless component : une simple fonction (attention, on utilise plus le "this")
 * @param {} props 
 */
function Card(props) {
  return (
    <article className="bg-secondary p-3 text-white mb-3 rounded">
     <h4>{props.card.question}</h4>
     <h3>{props.card.reponse}</h3>
     <p>{props.card.explication}</p>
    </article>

  );
}
export default Card;