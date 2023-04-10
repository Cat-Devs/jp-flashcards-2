## Game modes

- [Game modes](#game-modes)
  - [Learning](#learning)
  - [Strength](#strength)
  - [Fast Game](#fast-game)

Any user will be able to choose the game mode before starting a new game.

The available game modes are the following:

1. Learning
2. Strength
3. Fast game

### Learning

* A user will start with a deck of N cards.
* The cards will be randomly picked from the ones having level 1.
* Once the user progressively completes their cards, no more cards will be added to their deck until the completion of all the cards available for that game session.
* Every time a user completes a card, a user's card will be created if not already existing in the database.
* Every time a user completes a card, the user's weak cards deck will be updated accordingly.
* Once the level 1 is completed, the user will be upgraded to a User Level 2 and so on until the completion of all the levels.

### Strength

* This game mode will only be available if the user has a weak cards deck.
* A user will start with a deck of N cards.
* The cards will be randomly picked from the user's weak cards deck.
* Once the user progressively completes their cards, other random ones will be added to their deck until the completion of all the weak cards.
* Cards under the weak cards deck will be removed once their strength reaches 100%.
* Once the user has successfully completed all the cards under their weak cards deck, the Strength mode will not be available to the user as a game mode.

### Fast Game

* A user will start with a deck of N cards.
* The game deck of cards will only be generated in memory (no deck will be created in the database)
* A user will be asked to enter the game settings for this game.
* The deck of cards will be generated based on the user's game settings selected.
* Once the user progressively completes their cards, no more cards will be added to their deck.
* Once the cards deck are completed, the game will end.
