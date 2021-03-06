import React from "react";

class App extends React.Component {
  state = {
    deck: [
      { value: 13, suit: "clubs", link: "back.png" },
      { value: 13, suit: "clubs", link: "back.png" },
      { value: 13, suit: "hearts", link: "back.png" },
      { value: 13, suit: "hearts", link: "back.png" },
      { value: 13, suit: "diamonds", link: "back.png" },
      { value: 13, suit: "diamonds", link: "back.png" },
      { value: 14, suit: "clubs", link: "back.png" },
      { value: 14, suit: "clubs", link: "back.png" },
      { value: 14, suit: "hearts", link: "back.png" },
      { value: 14, suit: "hearts", link: "back.png" },
      { value: 14, suit: "diamonds", link: "back.png" },
      { value: 14, suit: "diamonds", link: "back.png" },
    ],
    chosen: [],
    mistakes: 0,
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
      return card.link === "blank.png";
    });

    if (checkWinningCondition) {
      return;
    }

    setTimeout(() => {
      const chosen = this.state.chosen;
      if (this.state.chosen.length === 2) {
        const newDeck = [...this.state.deck];
        if (
          chosen[0].value === chosen[1].value &&
          chosen[0].suit === chosen[1].suit
        ) {
          // Removing matched cards
          let firstCardToRemove = { ...newDeck[chosen[0].index] };
          firstCardToRemove.link = "blank.png";
          newDeck[chosen[0].index] = firstCardToRemove;

          let secondCardToRemove = { ...newDeck[chosen[1].index] };
          secondCardToRemove.link = "blank.png";
          newDeck[chosen[1].index] = secondCardToRemove;
          this.setState({ chosen: [], deck: newDeck });
        } else {
          //  Flipping unmatched cards face down
          let firstCardToChangeBack = { ...newDeck[chosen[0].index] };
          firstCardToChangeBack.link = "back.png";
          newDeck[chosen[0].index] = firstCardToChangeBack;

          let secondCardToChangeBack = { ...newDeck[chosen[1].index] };
          secondCardToChangeBack.link = "back.png";
          newDeck[chosen[1].index] = secondCardToChangeBack;

          this.setState({
            chosen: [],
            deck: newDeck,
            mistakes: this.state.mistakes + 1,
          });
        }
      }
    }, 3500);
  }

  onCardCompare = () => {
    const chosen = this.state.chosen;
    const checkWinningCondition = this.state.deck.every((card) => {
      return card.link === "blank.png";
    });

    if (checkWinningCondition) {
      return "Yahoo, you WON!!!";
    }
    if (chosen.length === 2) {
      if (
        chosen[0].value === chosen[1].value &&
        chosen[0].suit === chosen[1].suit
      ) {
        return "Chosen cards are matching";
      } else {
        return "Chosen cards are not matching";
      }
    } else {
      return "Try matching 2 cards";
    }
  };

  onCardState = (index, card) => {
    const chosen = this.state.chosen;

    if (card.link === "back.png") {
      if (chosen.length < 2) {
        const newChosen = [...chosen];
        const newCard = { ...this.state.deck[index] };

        newChosen.push(newCard);
        newChosen[newChosen.length - 1]["index"] = index;

        const newDeck = [...this.state.deck];
        newDeck[
          index
        ].link = `${newDeck[index].value}-${newDeck[index].suit}.png`;
        this.setState({ chosen: newChosen, deck: newDeck });
      }
    }
  };

  onMistakeCount = () => {
    const mistakes = this.state.mistakes;

    if (!mistakes) {
      return "You have made no mistakes";
    } else {
      return `Mistakes: ${this.state.mistakes}`;
    }
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row text-center">
          <h1>Memory Game</h1>
        </div>
        <div className="row">
          <h2>{this.onCardCompare()}</h2>
        </div>
        <div className="row">
          <h3>{this.onMistakeCount()}</h3>
        </div>
        <div className="row">
          {this.state.deck.map((card, index) => {
            return (
              <div
                style={{ height: "18vh" }}
                key={Math.random()}
                className="col-4 mt-1"
              >
                <img
                  style={{ height: "100%", cursor: "pointer" }}
                  src={require(`./images/${card.link}`)}
                  alt=""
                  className="img-fluid"
                  onClick={() => this.onCardState(index, card)}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
