## Cards and Decks

- [Cards and Decks](#cards-and-decks)
  - [Cards deck](#cards-deck)
  - [Decks](#decks)
  - [Cards](#cards)
    - [Flash card](#flash-card)
  - [Card layouts](#card-layouts)
    - [Hiragana](#hiragana)
    - [Mode A](#mode-a)
    - [Front](#front)
    - [Back](#back)
    - [Mode B](#mode-b)
    - [Front](#front-1)
    - [Back](#back-1)
    - [Mode C](#mode-c)
    - [Front](#front-2)
    - [Back](#back-2)
    - [Mode D](#mode-d)
    - [Front](#front-3)
    - [Back](#back-3)
    - [Mode E](#mode-e)
    - [Front](#front-4)
    - [Back](#back-4)
    - [Learning](#learning)
    - [Mode A](#mode-a-1)
    - [Front](#front-5)
    - [Back](#back-5)
    - [Mode B](#mode-b-1)
    - [Front](#front-6)
    - [Back](#back-6)
    - [User card](#user-card)
    - [User weak card](#user-weak-card)

### Cards deck

A deck of cards will need to exist before starting any game.

Before starting the game, a deck of cards may either exist in the database or be generated based on the game mode selected by the user.

### Decks

1. **User Cards:**: Deck of cards containing all the learned cards for a user.
1. **User Weak Cards**: Deck of cards containing all the user's learned cards with a strength less than 100%.
1. **User Game Deck**: Every time a user starts a new game, a deck of cards will be created.

### Cards

#### Flash card

A game flash card.

This card will contain the flash card data

Name     | Type   | Optional | Description
---------|--------|----------|------------
ID       | HASH   | false    | A unique card identifier
en       | string | false    | The card word in English
romaji   | string | false    | The card word in Romaji
level    | number | false    | The card difficulty level from 1 to 10
category | string | false    | The card category (eg. numbers, animals, colors)
hiragana | string | false    | The card word in hiragana format
katakana | string | true     | The card word in katakana format, if available

### Card layouts

#### Hiragana

Pictures can be turned off from user settings.

#### Mode A

Picture and hiragana letter on front side.
Sound with hiragana, romaji and english translation of the picture on back side.

#### Front

 +===============+
 | ID            |
 |               |
 |    PICTURE    |
 |               |
 |HIRAGANA LETTER|
 |               |
 +===============+

#### Back

 Play Sound on display
 +===============+
 | ID         🔊 |
 |               |
 |    PICTURE    |
 | HIRAGANA WORD |
 |    ROMAJI     |
 |    ENGLISH    |
 +===============+

#### Mode B

Picture example of hiragana letter on front side.
Sound with hiragana, romaji and english translation of the picture on back side.

#### Front

 +===============+
 | ID            |
 |               |
 |               |
 |    PICTURE    |
 |               |
 |               |
 +===============+

#### Back

 Play Sound on display
 +===============+
 | ID         🔊 |
 |    PICTURE    |
 |HIRAGANA LETTER|
 | HIRAGANA WORD |
 |    ROMAJI     |
 |    ENGLISH    |
 +===============+

#### Mode C

Sound of hiragana letter on front side.
Sound with hiragana letter and sample picture on back side.

#### Front

 Play Sound on display
 +===============+
 | ID            |
 |               |
 |       🔊      |
 |               |
 |               |
 +===============+

#### Back

 Play Sound on display
 +===============+
 | ID         🔊 |
 |               |
 |    PICTURE    |
 |HIRAGANA LETTER|
 |               |
 +===============+

#### Mode D

Hiragana letter on front side.
Sound with hiragana letter and sample picture on back side.

#### Front

 +===============+
 | ID            |
 |               |
 |HIRAGANA LETTER|
 |               |
 +===============+

#### Back

 Play Sound on display
 +===============+
 | ID            |
 |       🔊      |
 |    PICTURE    |
 |HIRAGANA LETTER|
 |               |
 +===============+

#### Mode E

Romaji letter on front side.
Sound with hiragana letter and sample picture on back side.

#### Front

 +===============+
 | ID            |
 |               |
 | ROMAJI LETTER |
 |               |
 +===============+

#### Back

 Play Sound on display
 +===============+
 | ID            |
 |       🔊      |
 |    PICTURE    |
 |HIRAGANA LETTER|
 |               |
 +===============+

#### Learning

Pictures can be turned off from user settings.

#### Mode A

Picture and English word on front side.
Sound with hiragana, romaji and english translation of the word on back side.

#### Front

 +===============+
 | ID            |
 |               |
 |    PICTURE    |
 |               |
 | ENGLISH WORD  |
 |               |
 +===============+

#### Back

 Play Sound on display
 +===============+
 | ID         🔊 |
 |               |
 |    PICTURE    |
 | HIRAGANA WORD |
 |    ROMAJI     |
 |    ENGLISH    |
 +===============+

#### Mode B

Picture and hiragana word on front side.
Sound with hiragana, romaji and english translation of the word on back side.

#### Front

 +===============+
 | ID            |
 |               |
 |    PICTURE    |
 |               |
 | HIRAGANA WORD |
 |               |
 +===============+

#### Back

 Play Sound on display
 +===============+
 | ID         🔊 |
 |               |
 |    PICTURE    |
 | HIRAGANA WORD |
 |    ROMAJI     |
 |    ENGLISH    |
 +===============+


#### User card
#### User weak card
