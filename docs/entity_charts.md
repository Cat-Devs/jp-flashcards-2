## Data entities and access pattern

- [Data entities and access pattern](#data-entities-and-access-pattern)
  - [Entity Charts](#entity-charts)
  - [Access Pattern](#access-pattern)

### Entity Charts

Entity   |	PK	           | SK                 |	GSI1PK | GSI1SK
---------|-----------------|--------------------|--------|-------
User     | USER#<Username> | USER#<Username>    |
Card	   | PC#<DeckId>	   | CARD#<CardId>      |
CardDeck | DECK#<Username> | DECK#<DeckId>      |
UserCard | PUC#<Username>	 | USER_CARD#<CardId> |

### Access Pattern

Access Pattern        | Target     | Parameters | Notes
----------------------|------------|------------|------
User CRUD	            | main table | Username   |	Unique requirement on username
Card CRUD	            | main table | CardId	    | CardId is a ULID
Get Cards by level    | main table | Level      | Query Operation
Get Cards by category	| main table | Category   | Query Operation
Get cards for a user  | main table | UserId     | Query Operation
User completes a card	| main table | Username<br>CardId | Put Operation
