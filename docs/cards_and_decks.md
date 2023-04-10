## Cards and Decks

- [Cards and Decks](#cards-and-decks)
  - [Cards deck](#cards-deck)
  - [Decks](#decks)
  - [Cards](#cards)
    - [Flash card](#flash-card)
    - [User card](#user-card)
    - [User weak card](#user-weak-card)

### Cards deck

A deck of cards will need to exist before starting any game.

Before starting the game, a deck of cards may either exist in the database or be generated based on the game mode selected by the user.

### Decks

1. **User cards:**: Deck of cards containing all the learned cards for a user.
1. **User weak cards**: Deck of cards containing all the
user's learned cards with a strength less than 100%.
1. **User game deck**: Every time a user starts a new game,
a deck of cards will be created.

### Cards

#### Flash card

A game flash card.

This card will contain the flash card data

Name     | Type   | Optional | Description
---------|--------|----------|------------
ID       | HASH   | false    | A unique card identifier
en       | string | false    | The card word in English
jp       | string | false    | The card word in Romaji
level    | number | false    | The card level
category | string | false    | The card category (eg. numbers, animals, colors)
hiragana | string | false    | The card word in hiragana format
katakana | string | true     | The card word in katakana format, if available
kanji    | string | true     | The card word in kanji format, if available

#### User card
#### User weak card
