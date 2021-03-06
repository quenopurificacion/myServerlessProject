const AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
    async get (id, TableName) {
        const params = {
            TableName,
            Key: {
                id
            }
        }

        const data = await documentClient
            .get(params)
            .promise();

        if(!data || !data.Item) {
            throw Error(`There was an error fetching the data for ID of ${id} from ${TableName}`)
        }
        console.log(data);

        return data.Item;
    },

    async write (data, TableName) {
        if(!data.id) {
            throw Error(`no id on the data`)
        }

        const params = {
            TableName,
            Item: data
        };

        const res = await documentClient
            .put(params)
            .promise();

        if(!res) {
            throw Error(`There was an error inserting id of ${data.id} in table ${TableName}`)
        }

        return data;

    },

    async delete (ID, TableName) {
        const params = {
            TableName,
            Key: {
                ID
            }
        };

        return documentClient.delete(params).promise();
    }
}

module.exports = Dynamo;