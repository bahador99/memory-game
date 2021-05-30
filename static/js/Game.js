import Sound from './Sound.js';

export default class Game {
  constructor() {
    // HTML elements
    this.cardsEl = document.querySelectorAll('.card');
    this.deckEl = document.querySelector('.deck');
    this.movesEl = document.querySelector('.moves');
    this.timeEl = document.querySelector('.time');
    this.pointsEl = document.querySelector('.points');
    this.resetEl = document.querySelector('.reset');
    this.winEl = document.querySelector('.win');

    // Game audio
    this.cardSound = new Sound('../audio/card.wav');
    this.matchSound = new Sound('../audio/match.mp3');
    this.unmatchSound = new Sound('../audio/unmatch.mp3');
    this.winSound = new Sound('../audio/win.mp3');
    this.resetSound = new Sound('../audio/reset.mp3');

    // array of all cards
    this.cards = [...this.cardsEl];

    // Add event listener to all cards
    this.cards.forEach((card) => {
      card.addEventListener('click', this.revealCard);
      card.addEventListener('click', this.playCard);
    });
    // event listener for reset button
    this.resetEl.addEventListener('click', this.resetGame);

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
    this.timeSec = 0; // total time in seconds
    this.timer = 0; // setInterval reference
    this.isWinner = false;

    // empty card arrays
    this.activeCards = []; // cards currently under comparison
    this.matchedCards = []; // matched cards so far

    // set HTML elements
    this.movesEl.innerText = '0';
    this.pointsEl.innerText = '0';
    this.timeEl.innerText = 'Click any two cards to start!';

    // shuffle cards and append to HTML element
    this.shuffleCards();
    this.deckEl.innerHTML = '';
    this.cards.forEach((card) => {
      card.classList.remove('open', 'show', 'disabled', 'matched', 'unmatched');
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
    this.resetSound.play();
  };

  // Reveal card and make then unclickable
  revealCard = (e) => {
    if (e.target.nodeName === 'LI') {
      const card = e.target;
      card.classList.add('open');
      card.classList.add('show');
      card.classList.add('disabled');
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
          this.matchSound.play();
        } else {
          // cards didn't match
          this.unmatchCards();
          this.unmatchSound.play();
        }
      } else {
        this.cardSound.play();
      }
    }
  };

  // update move count
  makeMove = () => {
    this.moves++;
    this.movesEl.innerText = this.moves;
    if (this.moves === 1) {
      this.startTimer();
    }
  };

  // start game timer
  startTimer = () => {
    this.timer = setInterval(() => {
      this.timeEl.innerText = `${this.min} min ${this.sec} sec`;
      this.sec++;
      this.timeSec++;
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

  // when two matching cards are revealed
  matchCards = () => {
    this.activeCards[0].classList.add('matched');
    this.activeCards[1].classList.add('matched');
    this.matchedCards.push(...this.activeCards);
    this.activeCards = [];
    // check if game is won
    if (this.matchedCards.length === 16) {
      this.winGame();
    }
  };

  // when two unmacheing cards are revealed
  unmatchCards = () => {
    this.activeCards[0].classList.add('unmatched');
    this.activeCards[1].classList.add('unmatched');
    this.disableCards();
    setTimeout(() => {
      this.activeCards[0].classList.remove('show', 'open', 'unmatched');
      this.activeCards[1].classList.remove('show', 'open', 'unmatched');
      this.enableCards();
      this.activeCards = [];
    }, 1000);
  };

  // disable cards for click events
  disableCards = () => {
    this.cards.forEach((card) => {
      card.classList.add('disabled');
    });
  };

  // enable unmatched cards for click events
  enableCards = () => {
    this.cards.forEach((card) => {
      card.classList.remove('disabled');
    });
    this.matchedCards.forEach((card) => {
      card.classList.add('disabled');
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

  // win game
  winGame = () => {
    this.endGame();
    console.log('You win!');
    this.winEl.classList.add('show');
    setTimeout(() => {
      this.winSound.play();
    }, 750);
    setTimeout(() => {
      this.winEl.classList.remove('show');
    }, 8500);
  };
}
