import AWS from "aws-sdk";

const {parallelScan} = require('@shelf/dynamodb-parallel-scan');
// Currently, all primary keys are username, so this works for our purposes.
//  If any table takes on a different primary key, a new function like getSortKey will have to be added, and code will need updating for the new primary key(s)
const PRIMARY_KEY = 'username';

// Procures the sort key based on the input tablename. Added for simplicity's sake; must be updated if tables are modified
function getSortKey(tableName: string){
  switch (tableName) {
    case 'friends_and_blocked':
      return 'fab_username';
    case 'messages':
      return 'message_id';
    case 'notifications':
      return 'notification_id';
    case 'posts_and_comments':
      return 'post_id';
    default:
      return undefined;
  }
}

// Takes in expressions in the form of tuples; eg. ['message_parent_id', '10200405']
function prepareScanParams(tableName: string, sortKey?: string, expressions?: [string, string]) {
  // Aliases are used by the computed properties, and by ExpressionAttributeNames
    let keyAlias = `#${PRIMARY_KEY}`;
    // This must be of type: Record because typescript is persnickety. Secondary is any just in case a delete all is desired.
    let scanParams: Record<string, any> = {
      TableName: tableName,
      ProjectionExpression: keyAlias,
      ExpressionAttributeNames: {
        [keyAlias]: PRIMARY_KEY,
      }
    }
    // This permits operation even in tables with no sort key. Note the use of the spread operator (...) to let previous attributes persist
    if (sortKey) {
      let sortAlias = `#${sortKey}`;
      scanParams.ProjectionExpression = `${keyAlias}, ${sortAlias}`
      scanParams.ExpressionAttributeNames = {
        ...scanParams.ExpressionAttributeNames,
        [sortAlias]: sortKey,
      }
    }
    // Permits to run without expressions, and builds FilterExpression, ExpressionAttributeNames, and ExpressionAttributeValues
    //  using the values given in the expressions array
    if (expressions) {
      let filters = expressions.map((i) => {
        return `#${i[0]} = :${i[0]}`;
      })
      let filterExpression = filters[0];
      for (let i = 1; i < filters.length; i++) {
        filterExpression += ' AND ' + filters[i];
      }
      scanParams = {
        ...scanParams,
        FilterExpression: filterExpression,
      }
      for (let x in expressions) {
        let expressionAlias = `#${expressions[x][0]}`;
        let expressionValueAlias = `:${expressions[x][0]}`;
        scanParams = {
          ...scanParams,
          ExpressionAttributeNames: {
            ...scanParams.ExpressionAttributeNames,
            [expressionAlias]: expressions[x][0],
          },
          ExpressionAttributeValues: {
            ...scanParams.ExpressionAttributeValues,
            [expressionValueAlias]: expressions[x][1],
          }
        }
      }
    }
    
    return scanParams;
}

// Performs the scan, retrieving up to 250 items at once.
async function fetchScan(params: {}) {
  const CONCURRENCY = 250;
  const items = await parallelScan(params, {concurrency: CONCURRENCY});
  return items;
}

// Using the results of the previous scan (which thanks to ProjectionExpression only returns the key anyway), builds 250 delete requests
function prepareRequestParams(items: [], sortKey?: string) {
  let requestParams;
  if (sortKey) {
    requestParams = items.map((i) => ({
      DeleteRequest: {
        Key: {
          [PRIMARY_KEY]: i[PRIMARY_KEY],
          [sortKey]: i[sortKey],
        },
      },
    }));
  } else {
    requestParams = items.map((i) => ({
      DeleteRequest: {
        Key: {
          [PRIMARY_KEY]: i[PRIMARY_KEY],
        },
      },
    }));
  }

  return requestParams;
}

// ...since 250 delete requests cannot be passed in a single batch, produces chunks of 25 at a time.
async function sliceInChunks(arr: any) {
  let i;
  let j;
  const CHUNK_SIZE = 25; // DynamoDB BatchWriteItem limit
  const chunks = [];

  for (i = 0, j = arr.length; i < j; i += CHUNK_SIZE) {
    chunks.push(arr.slice(i, i + CHUNK_SIZE));
  }

  // Note, chunks here is actually an array of arrays; 25 items times 10.
  return chunks;
}

// Sends up to 10 consecutive delete operations of 25 items at a time.
async function deleteItems(chunks: any) {
  const documentclient = new AWS.DynamoDB.DocumentClient();

  const promises = chunks.map(async function(chunk: any) {
    const params = {RequestItems: {[TABLE_NAME]: chunk}};
    const res = await documentclient.batchWrite(params).promise();
    return res;
  });

  return await Promise.all(promises);
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Use of deleteInBatch is intended to be very simple. Just table name, sort column, and filter value
 * All filter values, names, keys, etc are passed through placeholders, so even protected values can be used
 * Beware though: if the optional filter is not supplied, IT WILL BE TREATED AS A DELETE ALL
 * eg: deleteInBatch('messages', ['parent_id', '130201']);
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
export default async function deleteInBatch(tableName: string, filter?: [string, string]) {
  const sortKey = getSortKey(tableName);
  const scanParams = prepareScanParams(tableName, sortKey, filter);
  const items = await fetchScan(scanParams);
  const params = prepareRequestParams(items, sortKey);
  const chunks = await sliceInChunks(params);
  const res = await deleteItems(chunks);
  console.log(JSON.stringify(res));
};