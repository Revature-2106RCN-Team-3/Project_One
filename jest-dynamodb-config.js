/**
 * resources used:
 * Jest: https://jestjs.io/docs/dynamodb
 * awsdb table setup: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#createTable-property
 * 
 * * this module is used to create fake tables that we can call on using jest with dynamodb
 */
module.exports = {
    tables: [
        {
            TableName: 'Test-Posts',
            KeySchema: [{
                AttributeName: 'username',
                KeyType: 'HASH'
            }],
            AttributeDefinitions: [{
                AttributeName: 'username',
                AttributeType: 'S'
            }
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            },
        },
        {
            TableName: 'Test-Messages',
            KeySchema: [{
                AttributeName: 'username',
                KeyType: 'HASH'
            }],
            AttributeDefinitions: [{
                AttributeName: 'username',
                AttributeType: 'S'
            }],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            },
        },
        {
            TableName: 'Test-Notifications',
            KeySchema: [{
                AttributeName: 'username',
                KeyType: 'HASH'
            }],
            AttributeDefinitions: [{
                AttributeName: 'username',
                AttributeType: 'S'
            }],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            },
        },
        {
            TableName: 'Test-Users',
            KeySchema: [{
                AttributeName: 'username',
                KeyType: 'HASH'
            }],
            AttributeDefinitions: [{
                AttributeName: 'username',
                AttributeType: 'S'
            }],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            },
        },
        // add more test tables here if needed
    ],
};