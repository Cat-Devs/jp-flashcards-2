const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb');
const data = require('../offline/migrations/flashcards-seed.json');
require('dotenv').config();

// Create a DynamoDB client
const client = new DynamoDBClient({ region: process.env.AWS_REGION });

// Create a DynamoDBDocumentClient using the DynamoDBClient
const ddbDocClient = DynamoDBDocumentClient.from(client);

// Define your DynamoDB table name
const tableName = process.env.AWS_DB_TABLE_NAME;

// Function to insert data into DynamoDB
async function insertData() {
  for (const item of data) {
    const params = {
      TableName: tableName,
      Item: item,
    };

    try {
      await ddbDocClient.send(new PutCommand(params));
      console.log(`Inserted item with PK ${item.PK} and SK ${item.SK}`);
    } catch (error) {
      console.error(error.message);
    }
  }
}

// Call the function to insert data
insertData();
