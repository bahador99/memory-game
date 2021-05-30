# Memory Game

Memory game is a basic card matching game where the player is required to match pairs of cards until all the cards are correctly matched.

## Setting up dev env

`npm install` for installing the express package (it is used in the server.js file to create a simple node server). Then `npm start`.

## Decisions and assumptions

- Finne morsomme bilder til kortene. Statiske eller dynamiske?
  🖼 Static images
- Får spillerne poeng? Tar vi tiden på dem? Kanskje en poengtavle?
  🎉 Players get points as they play. Quicker moves and less number of moves result in more points.
  ⏱ There is a timer.
  🧮 No scoreboard implemented. Can be added later.
- Er det én-player? Kanskje multi-player?
  👨‍ One player. Multiplayer can be added later.
- Tilgjengelighet? Hva med å bruke tastaturet?
  🖱 Works with mouse. The keyboard feature can be added later.
- Mobiloptimalisering?
  📲 Optimized for mobile.
- Hva med sikkerhet og motvirke juks/regelbrudd?
  🤔 This we can talk about in the interview.
- Lyder og musikk?
  🎵 A few sound clips are used for different events in the game.

## General code structure

The HTML file `index.html` provides the deck of cards with images preloaded in it. The CSS file `styles.css` provieds different classes for played, matched, unmatched and disabled cards.

The JavsScript code provides two classes. The simple `Sound` class is in charge of creating `audio` elements for the different game events. The main `Game` class is includes the game logic.

### CSS

Currently the deck has a height and width based on the minimum of the screen hight and width, in order to avoid scroll bars and show all the game components in the screen.

## Further development

There are many features and improvements the can be implemented to the current game. The following is a non-exhaustive list of potential features.

1. Adding a scoreboard. For example, if the winner is among the top 10, they can enter their name next to their score. The data can be persisted through a simple file or in a database. The scoreboard could be shown either through a menu, next to the card deck or as a pop up after each finished game.
2. Multiplayer. This can be implemented in two ways.
   - The simple way would be having the multiplayer option through one device. The players would then take turns playing the game and every other move will count towards each player's points.
   - The more complex way would be to implement game sessions where two players could join the session through a unique link and then either take turns playing on the same deck or each play on their own deck while seeing the other players moves as well (both decks being the same and whoever finishes first, wins).
3. Better mobile optimization. The layout can be better optimized for different screen sized. This will be more important when more elements will be added to the page, such as scoreboard or other popups.
4. A better popup at the end of the game, which potentially shows game stats, scoreboard, a replay button and other option.
5. A settings section for managing some game settings, such as play or stop music, deck or other element colors, single/multiplayer option, etc.
6. Supporting keyboard. Arrow keys (or WASD) for navigating through the cards, space for revealing cards. And optionally more keys triggering other events.
7. Adding music.
8. Adding more animations.
9. Coming up with a better equation for calculating points based on time and number of moves. Currently the game uses a linear equation for reducing added points as time passes and the number of moves increases.
