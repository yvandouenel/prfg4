import React, { Component } from 'react';
import '../css/custom.css';

class AddCard extends Component {
  state = {}
  render() {
    return (
      <section id="form-add-card">
        <form 
          onSubmit={(event) => {this.props.onSubmitAddCard(event,this.props.column)}}
        >
          <label htmlFor="question">Question</label>
          <input type="text" id="question" /><br/>
          <label htmlFor="answer">Réponse</label>
          <input type="text" id="answer" /><br/>
          <label htmlFor="explanation">Explication</label>
          <input type="text" id="explanation" /><br/>
          <input type="submit" value="Ajouter" />
        </form>
      </section>

    );
  }
}

export default AddCard;