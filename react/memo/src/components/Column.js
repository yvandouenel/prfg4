import React, { Component } from 'react';
import Card from './Card';

class Column extends Component {
  state = {  }
  render() {
    return (
      <section className="m-2">
        <h3>{this.props.col_name}</h3>
        {this.props.cards.map(card => <Card key={card.id} card={card} />)}
      </section>
    );
  }
}

export default Column;