import React, { Component } from 'react';

class Card extends Component {
  state = {  }
  render() {
    return (
      <article>
       <h4>{this.props.card.question}</h4>
       <h3>{this.props.card.reponse}</h3>
       <p>{this.props.card.explication}</p>
      </article>

    );
  }
}

export default Card;