const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();

const getCharacters = async(event) => {
   try {
    const result = await dynamodb.scan({
        TableName:'PeopleTable'
    }).promise()

    const characters = result.Items || [];
    return {
        statusCode : 200,
        body: JSON.stringify({characters})
    }
   } catch (error) {
    console.error('error',error);
    return {
        statusCode: 500,
        body: JSON.stringify({ mensaje: 'Error al obtener los personaje' }),
    };
   }
}

module.exports = {
    getCharacters
}