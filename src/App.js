import React from "react";

class App extends React.Component {
  state = {
    deck: [
      {value: 14, suit: 'clubs', link: 'back.png'},
      {value: 14, suit: 'clubs', link: 'back.png'},
      {value: 14, suit: 'hearts',  link: 'back.png'},
      {value: 14, suit: 'hearts',  link: 'back.png'},
      {value: 14, suit: 'diamonds',  link: 'back.png'},
      {value: 14, suit: 'diamonds',  link: 'back.png'},
    ],
    chosen: [],
  };

  onDeckShuffle = () => {
    const newDeck = [...this.state.deck];
    let currentIndex = newDeck.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = newDeck[currentIndex];
      newDeck[currentIndex] = newDeck[randomIndex];
      newDeck[randomIndex] = temporaryValue;
    }
    this.setState({ deck: newDeck });
  };

  componentDidMount() {
    this.onDeckShuffle();
  }
  
  componentDidUpdate() {

    const checkWinningCondition = this.state.chosen.every((card) => {
      return card.link === 'blank.png'
    })

    if (checkWinningCondition) {
      return
    }

    setTimeout(() => {
      
      const chosen = this.state.chosen;
      if (this.state.chosen.length === 2) {
        if ((chosen[0].value === chosen[1].value) && (chosen[0].suit === chosen[1].suit)) {
          const newDeck = [...this.state.deck];
          let firstCardToRemove = {...newDeck[chosen[0].index]}
          firstCardToRemove.link = 'blank.png';
          newDeck[chosen[0].index] = firstCardToRemove;
          
          let secondCardToRemove = {...newDeck[chosen[1].index]}
          secondCardToRemove.link = 'blank.png';
          newDeck[chosen[1].index] = secondCardToRemove;

          this.setState({chosen: [], deck: newDeck})

          
        } 
        else {
          const newDeck = [...this.state.deck];
          
          let firstCardToChangeBack = {...newDeck[chosen[0].index]}
          firstCardToChangeBack.link = 'back.png';
          newDeck[chosen[0].index] = firstCardToChangeBack;
          
          let secondCardToChangeBack = {...newDeck[chosen[1].index]}
          secondCardToChangeBack.link = 'back.png';
          newDeck[chosen[1].index] = secondCardToChangeBack;


          this.setState({chosen: [], deck: newDeck})
        }
        
      }
    }, 2000);
    
  }
  
  onCardCompare = () => {
    const chosen = this.state.chosen;
    const checkWinningCondition = this.state.chosen.every((card) => {
      return card.link === 'blank.png'
    })
    
    if (chosen.length === 2) {
      if (checkWinningCondition) {
        return 'Yahoo, you WON!!!'
      }
      else if 
      ((chosen[0].value === chosen[1].value) && (chosen[0].suit === chosen[1].suit)) {
        return 'Your cards are matching';
      } 
      else {
        return 'Your cards are not matching';
      } 
    }
  }

  onCardState = (index, card) => {
    const chosen = this.state.chosen;
    
    if (card.link === 'back.png') {
      if (chosen.length < 2) {
        const newChosen = [...chosen];
        const newCard = {...this.state.deck[index]}

        newChosen.push(newCard);
        newChosen[newChosen.length-1]['index'] = index;

        const newDeck = [...this.state.deck]
        newDeck[index].link = `${newDeck[index].value}-${newDeck[index].suit}.png`
        this.setState({ chosen: newChosen, deck: newDeck});
      }
      
    }
  }

  render() {

    return (
      <div className="container-fluid">
        <div className="row text-center">
          <h1>Memory Game</h1>
        </div>
        <div className="row">
          
          {this.state.deck.map((card, index) => {
            return (
              <div key={Math.random()} className="col-4">
                <img
                  src={require(`./images/${card.link}`)}
                  // src={require(`./images/back.png`)}
                  className="img-fluid"
                  onClick={() => this.onCardState(index, card)}
                />
              </div>
            );
          })}
        </div>
        <div className="row">
          <h2>{this.onCardCompare()}</h2>
        </div>
      </div>
    );
  }
}

export default App;