module.exports = {
    tables: [{
        TableName: "user-test",
        KeySchema: [{
                AttributeName: "username",
                KeyType: "HASH"
            }
        ],
        AttributeDefinitions: [{
                AttributeName: "username",
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


// export default tables = [{
//         TableName: "user-test",
//         KeySchema: [{
//             AttributeName: "username",
//             KeyType: "HASH"
//         }],
//         AttributeDefinitions: [{
//             AttributeName: "username",
//             AttributeType: "S"
//         }],
//         ProvisionedThroughput: {
//             ReadCapacityUnits: 5,
//             WriteCapacityUnits: 5,
//         },
//         data: [{
//             username: "barryA@Ccity.com",
//             first_name: "Barry",
//             last_name: "Allen",
//             phone_number: "123-456-7890",
//             publicName: "SpeedForce"
//         },
//         {
//             username: "cKent@smallville.net",
//             first_name: "Clark",
//             last_name: "Kent",
//             phone_number: "816-691-4562",
//             publicName: "ManOfSteel"
//         },
//         {
//             username: "bWayne@gotham.org",
//             first_name: "Bruce",
//             last_name: "Wayne",
//             phone_number: "546-456-8956",
//             publicName: "DarkKnight"
//         },
//         {
//             username: "diPrince@themyscira.com",
//             first_name: "Diana",
//             last_name: "Prince",
//             phone_number: "301-458-9865",
//             publicName: "AmazonWonder"
//         }
//         ],
//     }],
//     basePort:8000,
// };