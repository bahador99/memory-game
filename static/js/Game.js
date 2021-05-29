export default class Game {
  constructor() {
    // HTML elements
    this.cardsEl = document.querySelectorAll('.card');
    this.deckEl = document.querySelector('.deck');
    this.movesEl = document.querySelector('.moves');
    this.timeEl = document.querySelector('.time');
    this.pointsEl = document.querySelector('.points');

    // array of all cards
    this.cards = [...this.cardsEl];
    // opened cards that are currently being played
    this.activeCards = [];
    this.matchedCards = [];

    // Add event listener to all cards
    this.cards.forEach((card) => {
      card.addEventListener('click', this.revealCard);
      card.addEventListener('click', this.playCard);
    });

    this.startGame();
  }

  /**
   * GAME FLOW
   */

  startGame = () => {
    // initialize game data
    this.moves = 0;
    this.points = 0;
    this.sec = 0;
    this.min = 0;
    this.hour = 0;
    this.timeSec = 0; // time in seconds
    this.timer = 0;
    this.isWinner = false;

    // shuffle cards and append to HTML element
    this.shuffleCards();
    this.deckEl.innerHTML = '';
    this.cards.forEach((card) => {
      this.deckEl.appendChild(card);
    });
  };

  endGame = () => {
    // stop timer
    clearInterval(this.timer);
  };

  resetGame = () => {
    // end previous game
    this.endGame();
    // start new game
    this.startGame();
  };

  // Reveal card and make then unclickable
  revealCard = (e) => {
    if (e.target.nodeName === 'LI') {
      const card = e.target;
      card.classList.toggle('open');
      card.classList.toggle('show');
      card.classList.toggle('disabled');
    }
  };

  // play a card and check matched
  playCard = (e) => {
    if (e.target.nodeName === 'LI') {
      const card = e.target;
      this.activeCards.push(card);

      // check if two cards are active
      if (this.activeCards.length === 2) {
        this.makeMove();
        if (this.activeCards[0].type === this.activeCards[1].type) {
          // cards matched
          this.matchCards();
          this.addPoints();
        } else {
          // cards didn't match
          this.unmatchCards();
        }
      }
    }
  };

  makeMove = () => {
    this.moves++;
    this.movesEl.innerText = this.moves;
    if (this.moves === 1) {
      this.startTimer();
    }
  };

  startTimer = () => {
    this.timer = setInterval(() => {
      this.timeEl.innerText = `${this.min} min ${this.sec} sec`;
      this.sec++;
      this.timeSec++;
      console.log(this.sec);
      if (this.sec === 60) {
        this.sec = 0;
        this.min++;
      }
      if (this.min === 60) {
        this.min = 0;
        this.hour++;
      }
    }, 1000);
  };

  matchCards = () => {
    this.activeCards[0].classList.add('matched');
    this.activeCards[1].classList.add('matched');
    this.matchedCards.push(...this.activeCards);
    this.activeCards = [];
    console.log(this.matchedCards.length);
    // check if game is won
    if (this.matchedCards.length === 16) {
      this.endGame();
      console.log('You win!');
    }
  };

  unmatchCards = () => {
    this.activeCards[0].classList.add('unmatched');
    this.activeCards[1].classList.add('unmatched');
    this.disableCards();
    setTimeout(() => {
      this.activeCards[0].classList.remove(
        'show',
        'open',
        'no-event',
        'unmatched'
      );
      this.activeCards[1].classList.remove(
        'show',
        'open',
        'no-event',
        'unmatched'
      );
      this.enableCards();
      this.activeCards = [];
    }, 1000);
  };

  // @description disable cards temporarily
  disableCards = () => {
    this.cards.forEach((card) => {
      card.classList.add('disabled');
    });
  };

  enableCards = () => {
    this.cards.forEach((card) => {
      card.classList.remove('disabled');
    });
  };

  /**
   * Fisher-Yates (aka Knuth) Shuffle (unbiased shuffle algorithm)
   * @param {Array} array The array to be shuffled
   * @returns Shuffled array
   */
  shuffleCards = () => {
    const array = this.cards;
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  };

  // Calculate points per move, add to total and show
  addPoints = () => {
    let points = 1000 - 10 * this.timeSec - 20 * this.moves;
    if (points < 10) points = 10;

    this.points += points;
    this.pointsEl.innerText = `${this.points}`;
  };
}
