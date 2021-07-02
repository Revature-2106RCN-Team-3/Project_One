module.exports = {
    tables: [{
        TableName: "post_and_comments",
        KeySchema: [{
                AttributeName: "username",
                KeyType: "HASH"
            },
            {
                AttributeName: "post_id",
                KeyType: "RANGE"
            }
        ],
        AttributeDefinitions: [{
                AttributeName: "username",
                AttributeType: "S"
            },
            {
                AttributeName: "post_id",
                AttributeType: "S"
            }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
        },
    },
    {
        TableName: "messages",
        KeySchema: [{
                AttributeName: "username",
                KeyType: "HASH"
            },
            {
                AttributeName: "message_id",
                KeyType: "RANGE"
            }
        ],
        AttributeDefinitions: [{
                AttributeName: "username",
                AttributeType: "S"
            },
            {
                AttributeName: "message_id",
                AttributeType: "S"
            }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
        },
    } ],
    basePort: 8000,
};
