## Data entities and access pattern

- [Data entities and access pattern](#data-entities-and-access-pattern)
  - [Entity Charts](#entity-charts)
  - [Access Patterns](#access-patterns)

### Entity Charts

User: A user must have a unique username and an email address

Card: A card must have a unique cardId, a category, a level. It should contain an English word and a translated Japanese one.

UserCard: While playing a game, every time a user completes a card, a UserCard entry will be created, if not already existing. Each UserCard will have an "accuracy" based of the precision of correct answer given by the user for the specific card.

Entity       |	PK	             | SK           | Attributes                  | Notes
-------------|-------------------|--------------|-----------------------------|----------------------------------------------
User         | u#<username>      | u#<username> | entityType, username, email | entityType is 'User'. Username must be unique.
Card	       | c#<CardId>        | c#<CardId>   | entityType, en, jp, level, category, GSI1-PK, GSI1-SK, GSI2-PK, GSI2-SK | entityType is 'Card'. CardId is a random ULID.
UserCard     | u#<username>      | c#<CardId>   | entityType, GSI1-PK, GSI1-SK, cardId, accuracy | entityType is 'UserCard'.

**entityType** is an identifier used to categorise the items stored in the database. This will reflect the Entity column.

### Access Patterns


Get user for a given username

Get card for a given cardId

Get Cards for a given level

Get Cards for a given category

Get all learned Cards for a given user

Get weak Cards for a given user

Create user card

Update user card

Access Pattern                           | Table / GSI | Parameters | Key Conditions | Notes
-----------------------------------------|-------------|------------|----------------|---------------------
Get user for a given username            | table | username   | PK=u#<username> and SK=u#<username>       | GetItem. Unique requirement on username
Get card for a given cardId              | table | cardId	    | PK=c#<cardId> and SK=c#<cardId>           | GetItem. cardId is a ULID
Get Cards for a given level              | GSI1  | level      | PK=cl#<level> and SK begins_with "cc#"    | Query Operation
Get Cards for a given category	         | GSI2  | category   | PK=cc#<category> and SK begins_with "cl#" | Query Operation
Get Cards for a given level and category | GSI2  | level, category | PK=cc#<level> and SK=cl#<category>   | Query Operation
Get all learned Cards for a given user   | table | username   | PK=u#<username> and SK begins_with "c#"   | Query Operation
Get weak Cards for a given user	         | GSI1  | username   | PK=uc#<username> and SK=weak              | Query Operation
Create user                              | table | username, email            | PK=u#<username> and SK=u#<username> | PutItem
Create user card                         | table | username, cardId, accuracy | PK=u#<username> and SK=c#<cardId>   | PutItem
Update user card                         | table | username, cardId, accuracy | PK=u#<username> and SK=c#<cardId>   | UpdateItem