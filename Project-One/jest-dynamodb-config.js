
/**
 * resources used:
 * Jest: https://jestjs.io/docs/dynamodb
 * awsdb table setup: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#createTable-property
 * 
 */
module.exports = {
    tables: [{
            TableName: 'test',
            KeySchema: [{
                AttributeName: 'username',
                KeyType: 'HASH'
            }],
            AttributeDefinitions: [{
                AttributeName: 'username',
                AttributeType: 'N'
            }],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            },
        },
        // etc
    ],
};